import { Controller, Get, Param, Render } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('/chat')
export class ChatController {
    constructor(private readonly service: ChatService) { }

    @Get('/rooms/:roomId')
    @Render('chat')
    chat(@Param('roomId') roomId: string) {
        return {
            roomId: roomId
        };
    }

    @Get('/rooms')
    @Render('rooms')
    chat_room_list() {
        return { rooms: this.service.chatRoomList() };
    }

}
