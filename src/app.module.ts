import { Module } from '@nestjs/common';
import { AlertController } from './alert/alert.controller';
import { AlertGateway } from './alert/alert.gateway';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [],
  controllers: [AlertController],
  providers: [ChatGateway, AlertGateway],
})
export class AppModule {}
