import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PonyComponent } from '../pony/pony.component';

@Component({
  selector: 'pr-live',
  standalone: true,
  imports: [CommonModule, PonyComponent],
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent {
  raceModel: RaceModel | null = null;
  poniesWithPosition: Array<PonyWithPositionModel> = [];

  constructor(
    private raceService: RaceService,
    route: ActivatedRoute
  ) {
    const id = Number(route.snapshot.paramMap.get('raceId')!);
    this.raceService.get(id).subscribe(race => (this.raceModel = race));
    this.raceService
      .live(id)
      .pipe(takeUntilDestroyed())
      .subscribe(ponies => (this.poniesWithPosition = ponies));
  }
}
