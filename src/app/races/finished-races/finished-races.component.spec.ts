import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { FinishedRacesComponent } from './finished-races.component';
import { RaceComponent } from '../../race/race.component';

describe('FinishedRacesComponent', () => {
  const activatedRoute = {
    snapshot: {
      data: {
        races: [
          { name: 'Lyon', startInstant: '2020-02-18T08:02:00Z' },
          { name: 'Los Angeles', startInstant: '2020-02-18T08:03:00Z' }
        ]
      }
    }
  };

  beforeEach(() => {
    TestBed.overrideTemplate(RaceComponent, '<h2>Race</h2>');
    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }]
    });
  });

  it('should display every race', () => {
    const fixture = TestBed.createComponent(FinishedRacesComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.races).withContext('You need to have a field `races` initialized with 2 races').not.toBeNull();
    expect(fixture.componentInstance.races.length).withContext('You need to have a field `races` initialized with 2 races').toBe(2);
    expect(fixture.componentInstance.races[0].name).toBe('Lyon');
    expect(fixture.componentInstance.races[1].name).toBe('Los Angeles');

    const debugElement = fixture.debugElement;
    const raceNames = debugElement.queryAll(By.directive(RaceComponent));
    expect(raceNames.length).withContext('You should have two `RaceComponent` displayed').toBe(2);
  });

  it('should not display a link to bet on a race', () => {
    const fixture = TestBed.createComponent(FinishedRacesComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const raceNames = element.querySelectorAll('a');
    expect(raceNames.length).withContext('You must NOT have a link to go to the bet page for each race').toBe(0);
  });
});
