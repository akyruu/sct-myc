import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Player, Team, Vehicle} from '@sct-myc/api-interfaces';
import {Subscription} from 'rxjs';

import {AppContext, RushService} from '../../../core';
import {VehicleComparator} from '../../shared';

@Component({
  selector: 'sct-myc-team',
  templateUrl: './team-prepare.component.html'
})
export class TeamPrepareComponent implements OnInit, OnDestroy {
  /* FIELDS ================================================================ */
  readonly vehicleComparator = VehicleComparator;

  team: Team;
  vehicles: Vehicle[];

  readonly players = {
    ready: <Player[]>[],
    notReady: <Player[]>[],
    all: <Player[]>[],
    allReady: false
  };

  private readonly _subscriptions: Subscription[] = [];

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _route: ActivatedRoute,
    private _appContext: AppContext,
    private _rushService: RushService,
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this._subscriptions.push(
      this._route.data.subscribe((data: { team: Team, vehicles: Vehicle[] }) => {
        this.team = data.team;
        this.players.all = this._appContext.room.players.filter(player => player.teamId === data.team.id);
        this.vehicles = data.vehicles;
        this._refresh();
      }),
      this._appContext.playerRushChanges.subscribe(playerRush => {
        if (playerRush.teamId === this.team.id) {
          this._refresh();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /* Events ---------------------------------------------------------------- */
  doLaunch(): void {
    this._rushService.teamLaunch(this.team.id).then();
  }

  doSetVehicle(vehicle: Vehicle): void {
    this._rushService.teamSetVehicle(this.team.id, vehicle?.id).then();
  }

  /* Tools ----------------------------------------------------------------- */
  private _refresh(): void {
    this.players.ready = this.players.all.filter(player => player.rush.ready);
    this.players.notReady = this.players.all.filter(player => !player.rush.ready);
    this.players.allReady = this.players.notReady.length === 0;
  }
}
