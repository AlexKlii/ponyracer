import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent {
  @Input({ required: true }) ponyModel!: PonyModel;
  @Input() isRunning = false;
  @Input() isBoosted: boolean | undefined = false;

  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();

  getPonyImageUrl(): string {
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}${this.isBoosted ? '-rainbow' : this.isRunning ? '-running' : ''}.gif`;
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }
}
