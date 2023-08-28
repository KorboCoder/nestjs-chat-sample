
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
        envFilePath: ['.env', '.env.local']
    })],
  providers: [ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}

