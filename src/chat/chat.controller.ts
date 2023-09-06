import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
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
        let serverId: string;
        if (process.env.HOSTNAME) {
            serverId = process.env.HOSTNAME;
            serverId = serverId.slice(serverId.length - 5);
        }
        else {
            serverId = "No Pod Id"
        }

        return {
            serverId,
            rooms: await this.service.chatRoomList()
        };
    }

    @Post('/rooms')
    @Render('room-item')
    async create_chat_room(@Body('roomId') roomId: string) {
        await this.service.createRoom(roomId);
        return { roomId };

    }

}
