import { Injectable } from '@angular/core';
import { Player } from '@sct-myc/api-interfaces';
import { Socket } from 'socket.io';

@Injectable()
export class PlayerHelper {
  /* METHODS =============================================================== */
  createPlayer(client: Socket, playerName: string): Player {
    return {
      id: client.id,
      name: playerName
    };
  }
}
