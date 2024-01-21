import { Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, OnChanges {
  @Input() times: any[] = [];
  @Input() selectedTime: any;
  @Input() selectedMovie: any;
  @Input() selectedDate: any;

  @Output() updateSelectedTime = new EventEmitter<any>();

  ngOnInit(): void {
    //console.log('TimeComponent - selectedMovie:', this.selectedMovie);
    //console.log('TimeComponent - times:', this.times);
  }

  ngOnChanges(): void {
    //console.log('TimeComponent - ngOnChanges - selectedMovie:', this.selectedMovie);
    //console.log('TimeComponent - ngOnChanges - times:', this.times);
  }

  get filteredTimes(): any[] {
    const filtered = this.selectedMovie
      ? this.times.filter(time => {
        const match = this.selectedMovie.showtimes.some((showtime: any) => {
          //console.log('Comparison:', showtime.time, time.t, showtime.date, this.selectedDate.d);
          const comparison = showtime.time === time.t && showtime.date === String(this.selectedDate.d);
          //console.log('Result:', comparison);
          return comparison;
        });
        //console.log('Match:', match);
        return match;
      })
      : this.times;

    //console.log('TimeComponent - filteredTimes:', filtered);

    return filtered;

  }

  onSelectTime(): void {
    if (this.selectedTime) {
      console.log('TimeComponent - Selected Time:', this.selectedTime);
      console.log('TimeComponent - Selected Movie:', this.selectedMovie);
      console.log('TimeComponent - Filtered Times:', this.filteredTimes);
      this.updateSelectedTime.emit(this.selectedTime);
    } else {
      console.error('Selected time is undefined.');
    }
  }
}






