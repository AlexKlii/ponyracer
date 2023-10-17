import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FromNowPipe } from '../from-now.pipe';
import { PonyComponent } from '../pony/pony.component';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  standalone: true,
  imports: [CommonModule, FromNowPipe, PonyComponent, RouterLink],
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent {
  raceModel!: RaceModel;
  betFailed = false;

  constructor(
    private raceService: RaceService,
    private route: ActivatedRoute
  ) {
    this.raceModel = this.route.snapshot.data['race'];
  }

  betOnPony(pony: PonyModel): void {
    if (!this.isPonySelected(pony)) {
      this.raceService.bet(this.raceModel!.id, pony.id).subscribe({
        next: race => (this.raceModel = race),
        error: () => (this.betFailed = true)
      });
    } else {
      this.raceService.cancelBet(this.raceModel!.id).subscribe({
        next: () => (this.raceModel!.betPonyId = undefined),
        error: () => (this.betFailed = true)
      });
    }
  }

  isPonySelected(pony: PonyModel): boolean {
    return this.raceModel?.betPonyId === pony.id;
  }
}
