import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/chat' })
//  OnGatewayConnection, OnGatewayDisconnect
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log(`handle init `);
  }

  @SubscribeMessage('chatToSever')
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ) {
    this.logger.log('chat to server is called');
    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    this.logger.log('join room is called');
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    this.logger.log('leave room is called');
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
