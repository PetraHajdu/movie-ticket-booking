import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent {
  @Input() dates: any[] = [];
  @Input() selectedDate: any;
  @Output() updateSelectedDate = new EventEmitter<any>();

  onSelectDate(): void {
    this.updateSelectedDate.emit(this.selectedDate);
  }
}
