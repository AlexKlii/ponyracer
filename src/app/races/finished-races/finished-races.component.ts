import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from 'src/app/models/race.model';
import { RaceComponent } from 'src/app/race/race.component';

@Component({
  standalone: true,
  imports: [NgFor, RaceComponent],
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css']
})
export class FinishedRacesComponent {
  races: Array<RaceModel>;

  constructor(route: ActivatedRoute) {
    this.races = route.snapshot.data['races'];
  }
}
