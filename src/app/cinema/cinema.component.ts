// cinema.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent {
  @Input() movie!: any;
  @Input() selectedSeats: number[] = [];
  @Output() seatSelected = new EventEmitter<number>();
  @Output() seatDeselected = new EventEmitter<number>();

  seats: number[][] = Array.from({ length: 8 }, (_, i) =>
    Array.from({ length: 8 }, (_, j) => i * 8 + j)
  );

  handleSelectedState(seat: number): void {
    if (!this.movie || !('occupied' in this.movie) || !this.movie.occupied) {
      console.error('Occupied property of the movie is undefined');
      return;
    }

    const isSelected = this.selectedSeats.includes(seat);
    const isOccupied = this.movie.occupied.includes(seat);

    if (!isOccupied) {
      if (isSelected) {
        this.seatDeselected.emit(seat);
      } else {
        this.seatSelected.emit(seat);
      }
    }
  }

  getSeatClasses(seat: number): string[] {
    const isSelected = this.selectedSeats.includes(seat);
    const isOccupied = this.movie && this.movie.occupied && this.movie.occupied.includes(seat);

    return [
      'seat',
      isSelected && 'selected',
      isOccupied && 'occupied',
    ];
  }
}




