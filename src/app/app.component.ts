import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-ticket-booking';

  dates = [
    {
      d: '2023.12.13.',
    },
    {
      d: '2023.12.14.',
    },
    {
      d: '2023.12.15.',
    },
    {
      d: '2023.12.16.',
    }
  ];

  times = [
    {
      t: '09:30',
    },
    {
      t: '13:00',
    },
    {
      t: '15:30',
    },
    {
      t: '18:00',
    },
    {
      t: '20:30',
    }
  ];

  movies = [
    {
      id: 1,
      name: 'Napoleon 2D',
      showtimes: [
        {
          date: '2023.12.13.',
          time: '09:30',
          price: 8,
          occupied: [20, 21, 30, 1, 2, 8],
        },
        {
          date: '2023.12.13.',
          time: '18:00',
          price: 9,
          occupied: [22, 23, 31, 3, 4, 9],
        },
        {
          date: '2023.12.15.',
          time: '09:30',
          price: 8,
          occupied: [20, 21],
        },
        {
          date: '2023.12.16.',
          time: '09:30',
          price: 8,
          occupied: [20, 21, 3, 9, 4, 56],
        }
        ]
    },
    {
      id: 2,
      name: 'Wish 2D',
      showtimes: [
        {
          date: '2023.12.14.',
          time: '13:00',
          price: 9,
          occupied: [9, 41, 35, 11, 65, 26],
        },
        {
          date: '2023.12.14.',
          time: '15:30',
          price: 9,
          occupied: [22, 23, 31],
        },
        {
          date: '2023.12.14.',
          time: '20:30',
          price: 9,
          occupied: [1,5, 7, 45, 50],
        },
        {
          date: '2023.12.15.',
          time: '13:00',
          price: 9,
          occupied: [20, 21, 3, 9, 4, 56],
        },
        {
          date: '2023.12.15.',
          time: '15:30',
          price: 9,
          occupied: [45,56],
        },
        {
          date: '2023.12.16.',
          time: '13:00',
          price: 9,
          occupied: [20, 21, 3, 9, 4, 56],
        },
        {
          date: '2023.12.15.',
          time: '18:00',
          price: 9,
          occupied: [9, 41, 35, 11, 65, 26],
        }
      ]
    },
    {
      id: 3,
      name: 'Wonka 2D',
      showtimes: [
        {
          date: '2023.12.13.',
          time: '13:00',
          price: 9,
          occupied: [37, 25, 44, 13, 2, 3],
        },
        {
          date: '2023.12.13.',
          time: '15:30',
          price: 9,
          occupied: [22, 23, 31, 41, 42],
        },
        {
          date: '2023.12.13.',
          time: '20:30',
          price: 9,
          occupied: [1,5, 7, 45, 50, 55],
        },
        {
          date: '2023.12.16.',
          time: '15:30',
          price: 9,
          occupied: [20, 21, 3, 9, 4, 56],
        }
      ]
    },
    {
      id: 4,
      name: 'Wonka 3D',
      showtimes: [
        {
          date: '2023.12.14.',
          time: '09:30',
          price: 10,
          occupied: [10, 12, 50, 33, 28, 47],
        },
        {
          date: '2023.12.14.',
          time: '18:00',
          price: 12,
          occupied: [22, 23, 31, 41, 42, 55],
        },
        {
          date: '2023.12.15.',
          time: '18:00',
          price: 12,
          occupied: [1,5, 7, 45, 50, 55],
        },
        {
          date: '2023.12.15.',
          time: '20:30',
          price: 12,
          occupied: [20, 21, 3, 9, 4, 56],
        },
        {
          date: '2023.12.16.',
          time: '20:30',
          price: 12,
          occupied: [1, 2, 4, 5, 6, 7],
        }
      ]
    }
  ];

  selectedMovie: any;
  selectedDate: any;
  selectedTime: any;
  selectedSeats: number[] = [];
  filteredMovies: any[] = [];

  updateSelectedMovie(movie: any): void {
    this.selectedSeats = [];
    this.selectedMovie = movie;
    console.log('Selected Movie Updated:', movie);
  }

  updateSelectedSeats(seat: number): void {
    const selectedMovie = this.selectedMovie;

    if (!selectedMovie) {
      console.error('Selected movie is undefined');
      return;
    }

    const index = this.selectedSeats.indexOf(seat);
    if (index === -1) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.splice(index, 1);
    }

    console.log('Updated Selected Seats:', this.selectedSeats);
  }

  getTotalPrice(): number {
    if (this.selectedDate && this.selectedMovie && this.selectedTime) {
      const selectedSeatPrice = this.selectedMovie.showtimes.find((showtime: any) => {
        return showtime.date === this.selectedDate.d && showtime.time === this.selectedTime.t;
      });

      if (selectedSeatPrice) {
        return this.selectedSeats.length * selectedSeatPrice.price;
      }
    }

    return 0;
  }

  updateSelectedDate(date: any): void {
    this.selectedDate = date;

    console.log('Selected Date:', this.selectedDate.d);

    this.selectedMovie = null;

    this.filteredMovies = this.movies.filter(movie =>
      movie.showtimes.some((showtime: any) =>
        showtime.date === this.selectedDate.d && this.times.some(time => time.t === showtime.time)
      )
    );

    console.log('All Movies:', this.movies);
    console.log('Filtered Movies:', this.filteredMovies);
  }

  updateSelectedTime(time: any): void {
    console.log('Selected Time Updated:', time);

    if (this.selectedMovie && this.selectedDate) {
      const isTimeValid = this.selectedMovie.showtimes.some((showtime: any) =>
        showtime.date === this.selectedDate.d && showtime.time === time.t
      );

      if (isTimeValid) {
        this.selectedTime = time;
      } else {
        console.error('Invalid time selected:', time);
        this.selectedTime = null;
      }
    } else {
      this.selectedTime = null;
    }
  }

  handleBookingNow(): void {
    console.log('Selected Seats:', this.selectedSeats);

    if (this.selectedSeats.length > 0 && this.selectedMovie && this.selectedDate && this.selectedTime) {
      const selectedShowtime = this.selectedMovie.showtimes.find((showtime: any) => {
        return showtime.date === this.selectedDate.d && showtime.time === this.selectedTime.t;
      });

      if (selectedShowtime) {
        this.selectedSeats.forEach(seat => {
          if (!selectedShowtime.occupied.includes(seat)) {
            selectedShowtime.occupied.push(seat);
          }
        });
        this.selectedSeats = [];
        alert('Booking successful!');
      }
    } else {
      alert('Please select seats before booking.');
    }
  }

}

