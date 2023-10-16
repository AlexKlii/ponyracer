import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PonyComponent } from '../pony/pony.component';
import { filter, switchMap, tap } from 'rxjs';
import { FINISHED_RACE_STATUS, RUNNING_RACE_STATUS } from 'src/constants/status';
import { FromNowPipe } from '../from-now.pipe';

@Component({
  selector: 'pr-live',
  standalone: true,
  imports: [CommonModule, PonyComponent, FromNowPipe],
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent {
  raceModel: RaceModel | null = null;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  winners: Array<PonyWithPositionModel> = [];
  error = false;
  betWon: boolean | null = null;

  constructor(
    private raceService: RaceService,
    route: ActivatedRoute
  ) {
    const id = +route.snapshot.paramMap.get('raceId')!;
    this.raceService
      .get(id)
      .pipe(
        tap((race: RaceModel) => (this.raceModel = race)),
        filter(race => race.status !== FINISHED_RACE_STATUS),
        switchMap(() => this.raceService.live(id)),
        takeUntilDestroyed()
      )
      .subscribe({
        next: ponies => {
          this.poniesWithPosition = ponies;
          this.raceModel!.status = RUNNING_RACE_STATUS;
        },
        error: e => (this.error = true),
        complete: () => {
          this.raceModel!.status = FINISHED_RACE_STATUS;
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(pony => this.raceModel!.betPonyId === pony.id);
        }
      });
  }
}
