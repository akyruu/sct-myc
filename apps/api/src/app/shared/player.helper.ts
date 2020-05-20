import {Injectable} from '@angular/core';
import {Player, PlayerRucksack, PlayerRush} from '@sct-myc/api-interfaces';
import {Socket} from 'socket.io';

@Injectable()
export class PlayerHelper {
  /* METHODS =============================================================== */
  createPlayer(client: Socket, playerName: string): Player {
    return {
      id: client.id,
      name: playerName
    };
  }

  /* Rush ------------------------------------------------------------------ */
  createRush(player: Player): PlayerRush {
    return {
      playerId: player.id,
      teamId: player.teamId,
      ready: false
    };
  }

  createRucksack(player: Player): PlayerRucksack {
    return {
      type: player.rush.rucksackType,
      items: [],
      quantity: 0,
      storage: 0,
      value: 0
    };
  }
}
