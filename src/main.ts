import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";
import { ChatModule } from './chat/chat.module';

declare const module: any;
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(ChatModule);
    // if(module.hot){
    //     app.getHttpServer().
    // }
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname,'..', 'views'));
    app.setViewEngine('hbs');
    //
    await app.listen(3000);
    if(module.hot){
        console.log("Accepting...")
        module.hot.accept();
        module.hot.dispose(()=> app.close());
    }
}
bootstrap();
