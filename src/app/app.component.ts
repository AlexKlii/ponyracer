import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';

@Component({
  selector: 'pr-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, MenuComponent, RacesComponent]
})
export class AppComponent {
  title = 'ponyracer';
}
