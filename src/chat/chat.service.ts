import { Injectable } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";

const CHAT_ROOM_KEY = 'chat_room'

@Injectable()
export class ChatService {


    constructor(
        private gateway: ChatGateway,
    ) { }

    chatRoomList(): string[]{
        let rooms: string[] = [];
        for(let room of this.gateway.getRooms().keys()){
            rooms.push(room);
        }
        return rooms;
    }


}
