import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RaceModel } from 'src/app/models/race.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RaceComponent } from 'src/app/race/race.component';

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, RaceComponent],
  templateUrl: './pending-races.component.html',
  styleUrls: ['./pending-races.component.css']
})
export class PendingRacesComponent {
  races: Array<RaceModel>;

  constructor(route: ActivatedRoute) {
    this.races = route.snapshot.data['races'];
  }
}
