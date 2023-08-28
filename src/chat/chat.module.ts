
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@songkeys/nestjs-redis';
import { Effect } from 'effect';
import { ChatService } from './chat.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.local']
        }),
        // Used this package: https://github.com/Songkeys/nestjs-redis
        RedisModule.forRoot({
            config: {
                host: process.env.REDIS_HOST,
                port: Effect.runSync(
                        Effect.try(
                            () => parseInt(process.env.REDIS_PORT),
                        )
                        .pipe(Effect.orElseSucceed(()=>{return 6379;}))
                    )
            }

        })

    ],
    providers: [ChatGateway, ChatService],
    controllers: [ChatController],

})
export class ChatModule { }

