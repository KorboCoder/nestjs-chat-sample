import { Injectable, Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

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
export class ChatGateway  implements OnGatewayConnection{

    @WebSocketServer()
    server: Server;

    //add a logger
    private logger: Logger = new Logger('ChatGateway');

    handleConnection(client: Socket) {
        const roomId = client.handshake.query.roomId as string
        this.logger.log(`Client connected: ${client.id} | Joining: ${roomId}`);
        client.join(roomId);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: Message) {
        this.logger.log("Sending Message to: " + message.room);
        this.server.to(message.room).emit('message', message);
        this.logger.log("Received Message: " + message.body);
    }

    getRooms(){
        return this.server.sockets.adapter.rooms;
    }

}
