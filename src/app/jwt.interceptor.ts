import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const user: UserModel | null = userService.getCurrentUser();

  if (user && user.token) {
    const clone = req.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } });
    return next(clone);
  }

  return next(req);
};
