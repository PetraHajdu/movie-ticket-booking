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

  seats: { seatNumber: number, displayNumber: number }[][] = this.generateSeats();

  private generateSeats(): { seatNumber: number, displayNumber: number }[][] {
    const seatsArray: { seatNumber: number, displayNumber: number }[][] = [];
    const numRows = 8;
    const numCols = 8;

    let seatNumber = 1;

    for (let i = 0; i < numRows; i++) {
      const row: { seatNumber: number, displayNumber: number }[] = [];

      for (let j = 0; j < numCols; j++) {
        const displayNumber = j + 1;
        row.push({seatNumber, displayNumber});
        seatNumber++;
      }

      seatsArray.push(row);
    }

    return seatsArray;
  }

  handleSelectedState(seat: { seatNumber: number, displayNumber: number }): void {
    if (!this.movie || !('occupied' in this.movie) || !this.movie.occupied) {
      console.error('Occupied property of the movie is undefined');
      return;
    }

    const isSelected = this.selectedSeats.includes(seat.seatNumber);
    const isOccupied = this.movie.occupied.includes(seat.seatNumber);

    if (!isOccupied) {
      if (isSelected) {
        this.seatDeselected.emit(seat.seatNumber);
      } else {
        this.seatSelected.emit(seat.seatNumber);
      }
    }
  }

  getSeatClasses(seat: { seatNumber: number, displayNumber: number }): string[] {
    const isSelected = this.selectedSeats.includes(seat.seatNumber);
    const isOccupied = this.movie && this.movie.occupied && this.movie.occupied.includes(seat.seatNumber);

    return [
      'seat',
      isSelected && 'selected',
      isOccupied && 'occupied',
    ];
  }

}





