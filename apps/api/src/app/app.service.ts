import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): object {
    return { message: 'Welcome to api!' };
  }
}
