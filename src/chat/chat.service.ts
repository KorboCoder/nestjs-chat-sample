import { Injectable } from "@nestjs/common";
import { InjectRedis } from "@songkeys/nestjs-redis";
import Redis from "ioredis";

const CHAT_ROOM_KEY = 'chat_room'

@Injectable()
export class ChatService {

    constructor(
        @InjectRedis() private readonly redis: Redis
    ) { }

    async createRoom(roomId: string) {
        return await this.redis.set(`${CHAT_ROOM_KEY}:${roomId}`, '{}' );
    }

    async chatRoomList(): Promise<string[]>{
        let rooms: string[] = await this.redis.keys(`${CHAT_ROOM_KEY}:*`);
        rooms = rooms.map(room => room.replace(`${CHAT_ROOM_KEY}:`, ''));
        return rooms;
    }


}
