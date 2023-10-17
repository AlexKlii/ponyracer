import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor, SlicePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from 'src/app/models/race.model';
import { RaceComponent } from 'src/app/race/race.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [NgFor, RaceComponent, NgbPagination, SlicePipe],
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinishedRacesComponent {
  races: Array<RaceModel>;
  page: number = 1;
  pageSize: number = 10;

  constructor(route: ActivatedRoute) {
    this.races = route.snapshot.data['races'];
  }
}
