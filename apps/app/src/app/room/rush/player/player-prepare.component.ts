import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Player, Rucksack} from '@sct-myc/api-interfaces';
import {Subscription} from 'rxjs';

import {AppContext, RushHelper, RushService} from '../../../core';
import {RucksackComparator} from '../../shared';

@Component({
  selector: 'sct-myc-player',
  templateUrl: './player-prepare.component.html'
})
export class PlayerPrepareComponent implements OnInit, OnDestroy {
  /* FIELDS ================================================================ */
  readonly rucksackComparator = RucksackComparator;

  player: Player;
  rucksacks: Rucksack[] = [];
  myPlayer: boolean;

  private _myPlayerId: string;
  private _subscription: Subscription;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _route: ActivatedRoute,
    private _appContext: AppContext,
    private _rushHelper: RushHelper,
    private _rushService: RushService,
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this._myPlayerId = this._appContext.playerId.value;
    this._subscription = this._route.data.subscribe((data: {
      player: Player,
      rucksacks: Rucksack[]
    }) => {
      this.player = data.player;
      this.rucksacks = data.rucksacks;
      this.myPlayer = data.player.id === this._myPlayerId;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /* Events ---------------------------------------------------------------- */
  doReady(ready: boolean): void {
    this._rushService.playerSetReady(this.player.id, ready).then();
  }

  doSetRucksackType(rucksack: Rucksack) {
    this._rushService.playerSetRucksackType(this.player.id, rucksack?.id).then();
  }
}
