import { WsException } from '@nestjs/websockets';

export class TransWsException extends WsException {
  constructor(message: string, key: string, args?: object) {
    super({ message: message, key: key, args: args });
  }
}
