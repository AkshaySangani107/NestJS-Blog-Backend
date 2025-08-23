import { Module } from '@nestjs/common';
import { SocketGateway } from './socket/socket.getway';

@Module({
  providers: [SocketGateway]
})
export class SocketModule {}
