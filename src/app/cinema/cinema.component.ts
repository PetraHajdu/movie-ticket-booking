import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  @Input() selectedSeats: number[] = []; // Hozzáadva a kijelölt ülésekhez
  @Input() movie: any = {}; // Példa: Az ülések státuszát tartalmazó objektum
  @Output() updateSelectedSeats = new EventEmitter<number[]>();

  seats: number[] | undefined;

  ngOnInit(): void {
    this.seats = Array.from({ length: 8 * 8 }, (_, i) => i);
    // Példa: Movie objektum inicializálása
    this.movie = {
      occupied: [1, 5, 10], // Példa: Előre elfoglalt ülések
    };
  }

  getSeatClasses(seat: number): string[] {
    return [
      'seat',
      this.selectedSeats.includes(seat) ? 'selected' : '',
      this.movie.occupied.includes(seat) ? 'occupied' : ''
    ];
  }

  onSelectSeat(seat: number): void {
    // Az ülésválasztás logikája
    if (this.selectedSeats.includes(seat)) {
      // Ha már kiválasztottuk, eltávolítjuk
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      // Kiválasztjuk az ülést
      this.selectedSeats.push(seat);
    }
  }
}

