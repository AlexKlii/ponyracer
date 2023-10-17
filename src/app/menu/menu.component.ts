import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, of, switchMap, concat, shareReplay } from 'rxjs';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pr-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbCollapse, AsyncPipe],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  navbarCollapsed: boolean = true;
  userEvents = this.userService.userEvents.pipe(
    takeUntilDestroyed(),
    switchMap(user => (user ? concat(of(user), this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) : of(null))),
    shareReplay()
  );

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
