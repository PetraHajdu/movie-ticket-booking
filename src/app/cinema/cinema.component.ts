import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent {
  @Input() movie!: any;
  @Input() selectedSeats!: number[];
  @Output() updateSelectedSeats = new EventEmitter<number | number[]>();

  seats: number[] = Array.from({ length: 8 * 8 }, (_, i) => i);

  handleSelectedState(seat: number): void {
    const isSelected = this.selectedSeats.includes(seat);
    if (isSelected) {
      this.updateSelectedSeats.emit(this.selectedSeats.filter(selectedSeat => selectedSeat !== seat));
    } else {
      this.updateSelectedSeats.emit([...this.selectedSeats, seat]);
    }
  }

  handleKeyPress(event: KeyboardEvent, seat: number): void {
    if (event.key === 'Enter') {
      this.handleSelectedState(seat);
    }
  }

  getSeatClasses(seat: number): string[] {
    const isSelected = this.selectedSeats.includes(seat);
    const isOccupied = this.movie.occupied.includes(seat);

    return [
      'seat',
      isSelected && 'selected',
      isOccupied && 'occupied',
    ];
  }
}



