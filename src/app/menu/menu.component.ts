import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, of, switchMap, concat } from 'rxjs';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pr-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbCollapse],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  navbarCollapsed: boolean = true;
  user: UserModel | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userService.userEvents
      .pipe(
        takeUntilDestroyed(),
        switchMap(user => (user ? concat(of(user), this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) : of(null)))
      )
      .subscribe(userWithScore => (this.user = userWithScore));
  }

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
