import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent {
  @Input() selectedMovie!: any;
  @Input() selectedSeats: number[] = [];
  @Input() selectedDate: any;
  @Input() selectedTime: any;

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

    const selectedShowtime = this.selectedMovie.showtimes.find((showtime: any) => {
      return showtime.date === this.selectedDate.d && showtime.time === this.selectedTime.t;
    });

    const isOccupied = selectedShowtime.occupied.includes(seat.seatNumber);

    const isSelected = this.selectedSeats.includes(seat.seatNumber);

    if (isSelected) {
      this.seatDeselected.emit(seat.seatNumber);
    } else {
      this.seatSelected.emit(seat.seatNumber);
    }

    if (this.selectedDate === null || this.selectedDate === undefined || this.selectedDate === '') {
      console.error('Please select a date before selecting a seat.');
      alert('Please select a date before selecting a seat.');
      return;
    }

    if (!this.selectedMovie) {
      console.error('Please select a movie before selecting a seat.');
      alert('Please select a movie before selecting a seat.');
      return;
    }

    if (!this.selectedTime) {
      console.error('Please select a time before selecting a seat.');
      alert('Please select a time before selecting a seat.');
      return;
    }

    if (isOccupied) {
      console.warn('Selected seat is already occupied.');
      alert('Selected seat is already occupied.');
      return;
    }


  }

  getSeatClasses(seat: { seatNumber: number, displayNumber: number }): string[] {
    const isSelected = this.selectedSeats.includes(seat.seatNumber);

    let isOccupied = false;

    if (this.selectedMovie && this.selectedMovie.showtimes && this.selectedTime) {
      isOccupied = this.selectedMovie.showtimes
        .filter((showtime: any) => {
          return (
            showtime.date === this.selectedDate.d &&
            showtime.time &&
            showtime.time === this.selectedTime.t
          );
        })
        .map((showtime: any) => showtime.occupied)
        .flat()
        .includes(seat.seatNumber);
    }

    return [
      'seat',
      isSelected ? 'selected' : '',
      isOccupied ? 'occupied' : '',
    ].filter(Boolean);
  }

}






