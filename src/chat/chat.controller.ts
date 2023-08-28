import { Controller, Get, Render } from '@nestjs/common';

@Controller('/chat')
export class ChatController {
  constructor() {}

    @Get()
    @Render('chat')
    chat() {
        return {};
    }
}
