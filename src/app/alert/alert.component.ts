import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'pr-alert',
  standalone: true,
  imports: [NgIf],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() type: 'success' | 'warning' | 'danger' = 'warning';
  @Input({ transform: booleanAttribute }) dismissible = true;

  @Output() readonly closed = new EventEmitter<void>();

  closeHandler(): void {
    this.closed.emit();
  }

  get alertClasses(): string {
    return `alert alert-${this.type} ${this.dismissible ? 'alert-dismissible' : ''}`;
  }
}
