import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { FromNowPipe } from '../from-now.pipe';
import { PonyComponent } from '../pony/pony.component';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  standalone: true,
  imports: [CommonModule, FromNowPipe, PonyComponent],
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent {
  raceModel: RaceModel | null = null;
  betFailed = false;

  constructor(
    private raceService: RaceService,
    route: ActivatedRoute
  ) {
    const id = Number(route.snapshot.paramMap.get('raceId')!);
    this.raceService.get(id).subscribe(race => (this.raceModel = race));
  }

  betOnPony(pony: PonyModel): void {
    if (this.raceModel) {
      this.betFailed = false;
      this.raceService.bet(this.raceModel.id, pony.id).subscribe({
        next: (race: RaceModel) => (this.raceModel = race),
        error: () => (this.betFailed = true)
      });
    }
  }

  isPonySelected(pony: PonyModel): boolean {
    return this.raceModel?.betPonyId === pony.id;
  }
}
