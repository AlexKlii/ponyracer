import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceModel } from '../models/race.model';
import { RaceComponent } from '../race/race.component';
import { RaceService } from '../race.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pr-races',
  standalone: true,
  imports: [CommonModule, RaceComponent, RouterLink],
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent {
  races: Array<RaceModel> = [];

  constructor(private raceService: RaceService) {
    this.raceService.list().subscribe((races: Array<RaceModel>) => (this.races = races));
  }
}
