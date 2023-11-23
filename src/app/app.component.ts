// app.component.ts

import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-ticket-booking';
/*
  movies = [
    {
      id: 1,
      name: 'Avenger',
      price: 10,
      occupied: [20, 21, 30, 1, 2, 8],
    },
    {
      id: 2,
      name: 'Joker',
      price: 12,
      occupied: [9, 41, 35, 11, 65, 26],
    },
    {
      id: 3,
      name: 'Toy story',
      price: 8,
      occupied: [37, 25, 44, 13, 2, 3],
    },
    {
      id: 4,
      name: 'the lion king',
      price: 9,
      occupied: [10, 12, 50, 33, 28, 47],
    }
  ];

  selectedMovie = this.movies[0];
  selectedSeats: number[] = [];
*/
  movies: any[] = [];
  selectedMovie: any;
  selectedSeats: number[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.selectedMovie = this.movies[0];
    });
  }

  updateSelectedMovie(movie: any): void {
    console.log('Selected Movie:', movie.name);
    this.selectedSeats = [];
    this.selectedMovie = movie;

    console.log('Selected Movie Object:', this.selectedMovie);
  }

  updateSelectedSeats(seat: number): void {
    const index = this.selectedSeats.indexOf(seat);
    if (index === -1) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.splice(index, 1);
    }
  }

  getTotalPrice(): number {
    if (this.selectedMovie) {
      return this.selectedSeats.length * this.selectedMovie.price;
    }
    return 0;
  }
}

