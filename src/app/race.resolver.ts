import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { RaceService } from './race.service';
import { inject } from '@angular/core';
import { RaceModel } from './models/race.model';

export const raceResolver: ResolveFn<RaceModel> = (route: ActivatedRouteSnapshot) => {
  const raceService = inject(RaceService);
  const raceId = parseInt(route.paramMap.get('raceId')!);
  return raceService.get(raceId);
};
