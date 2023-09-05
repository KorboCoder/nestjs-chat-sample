import { Body, Controller, Get, Param, Post, Query, Render } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('/chat')
export class ChatController {
    constructor(private readonly service: ChatService) { }

    @Get('/')
    @Render('chat')
    chat(@Query('roomId') roomId: string) {
        return {
            roomId: roomId
        };
    }

    @Get('/rooms')
    @Render('rooms')
    async chat_room_list() {
        return { rooms: await this.service.chatRoomList() };
    }

    @Post('/rooms')
    @Render('room-item')
    async create_chat_room(@Body('roomId') roomId: string) {
        await this.service.createRoom(roomId);
        return { roomId };
        
    }

}
