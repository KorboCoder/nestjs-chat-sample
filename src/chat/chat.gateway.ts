import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

class Message {
    body: string;
}

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    path: '/chat/socket-io'
})
export class ChatGateway  implements OnGatewayConnection{
    handleConnection(client: Socket) {
        client.join('default');
    }

    @WebSocketServer()
    server: Server;

    //add a logger
    private logger: Logger = new Logger('ChatGateway');

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: Message,
        @ConnectedSocket() client: Socket) {
        this.server.to('default').emit('message', message);
        this.logger.log("Received Message: " + message.body);
    }

}
