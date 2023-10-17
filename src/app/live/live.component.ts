import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PonyComponent } from '../pony/pony.component';
import { EMPTY, Subject, bufferToggle, catchError, filter, groupBy, interval, map, mergeMap, switchMap, throttleTime } from 'rxjs';
import { FINISHED_RACE_STATUS, RUNNING_RACE_STATUS } from 'src/constants/status';
import { FromNowPipe } from '../from-now.pipe';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'pr-live',
  standalone: true,
  imports: [CommonModule, PonyComponent, FromNowPipe, AlertComponent],
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent {
  raceModel: RaceModel | null = null;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  winners: Array<PonyWithPositionModel> = [];
  error = false;
  betWon: boolean | null = null;
  clickSubject: Subject<PonyWithPositionModel> = new Subject();

  constructor(
    private raceService: RaceService,
    private route: ActivatedRoute
  ) {
    this.raceModel = this.route.snapshot.data['race'];

    if (this.raceModel!.status !== FINISHED_RACE_STATUS) {
      this.raceService
        .live(this.raceModel!.id)
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: positions => {
            this.poniesWithPosition = positions;
            this.raceModel!.status = RUNNING_RACE_STATUS;
          },
          error: () => (this.error = true),
          complete: () => {
            this.raceModel!.status = FINISHED_RACE_STATUS;
            this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
            this.betWon = this.winners.some(pony => pony.id === this.raceModel!.betPonyId);
          }
        });
    }

    this.clickSubject
      .pipe(
        groupBy(pony => pony.id, { element: pony => pony.id }),
        mergeMap(obs => obs.pipe(bufferToggle(obs, () => interval(1000)))),
        filter(array => array.length >= 5),
        throttleTime(1000),
        map(array => array[0]),
        switchMap(ponyId => this.raceService.boost(this.raceModel!.id, ponyId).pipe(catchError(() => EMPTY)))
      )
      .subscribe();
  }

  onClick(pony: PonyWithPositionModel): void {
    this.clickSubject.next(pony);
  }

  ponyById(index: number, pony: PonyWithPositionModel): number {
    return pony.id;
  }
}
