import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";
import { ChatModule } from './chat/chat.module';
import { RedisIoAdapter } from './redis-io-adapter';

declare const module: any;
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(ChatModule);
    // if(module.hot){
    //     app.getHttpServer().
    // }
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();

    app.useWebSocketAdapter(redisIoAdapter);
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    console.log(`Env Port: ${process.env.PORT}`);
    await app.listen(process.env.PORT || 3000);
    if (module.hot) {
        console.log("Accepting...")
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
