import { Controller, Get, Param, Post, Render } from '@nestjs/common';
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
    async chat_room_list() {
        return { rooms: await this.service.chatRoomList() };
    }

    @Post('/rooms/:roomId')
    async create_chat_room(@Param('roomId') roomId: string) {
        await this.service.createRoom(roomId);
        
    }

}
