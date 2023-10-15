import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pr-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, MenuComponent, RouterOutlet]
})
export class AppComponent {
  title = 'ponyracer';
}
