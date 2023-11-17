import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-ticket-booking';

  movies = [
    {
      name: 'Avenger',
      price: 10,
      occupied: [20, 21, 30, 1, 2, 8],
    },
    {
      name: 'Joker',
      price: 12,
      occupied: [9, 41, 35, 11, 65, 26],
    },
    {
      name: 'Toy story',
      price: 8,
      occupied: [37, 25, 44, 13, 2, 3],
    },
    {
      name: 'the lion king',
      price: 9,
      occupied: [10, 12, 50, 33, 28, 47],
    }
  ];

  selectedMovie = this.movies[0];
  selectedSeats: number[] = [];

  updateSelectedMovie(movie: any): void {
    this.selectedSeats = [];
    this.selectedMovie = movie;
  }

  updateSelectedSeats(seats: number[] | number): void {
    if (Array.isArray(seats)) {
      // Ha a seats egy tömb, akkor kezeld a kiválasztott üléseket
      this.selectedSeats = seats.slice(); // Példa: az egész tömböt másold be
    } else {
      // Ha a seats egyetlen szám, akkor kezeld azt a számot
      const index = this.selectedSeats.indexOf(seats);
      if (index === -1) {
        this.selectedSeats.push(seats);
      } else {
        this.selectedSeats.splice(index, 1);
      }
    }
  }

  getTotalPrice(): number {
    return this.selectedSeats.length * this.selectedMovie.price;
  }
}
