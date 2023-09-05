import { Injectable, Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";

class Message {
    body: string;
    room: string
}

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
    },
    path: '/chat/socket-io'
})
export class ChatGateway implements OnGatewayConnection {

    @WebSocketServer()
    server: Server;

    //add a logger
    private logger: Logger = new Logger('ChatGateway');
    constructor(
        private service: ChatService
    ) {
    }

    async handleConnection(client: Socket) {
        const roomId = client.handshake.query.roomId as string
        this.logger.log(`Client connected: ${client.id} | Joining: ${roomId}`);
        await this.service.createRoom(roomId);
        client.join(roomId);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: Message) {
        this.logger.log("Sending Message to: " + message.room);
        this.server.to(message.room).emit('message', message);
        this.logger.log("Received Message: " + message.body);
    }

    getRooms() {
        return this.server.sockets.adapter.rooms;
    }

}
