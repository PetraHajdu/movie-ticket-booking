import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  @Input() movies: any[] = [];
  @Input() selectedMovie: any;
  @Output() updateSelectedMovie = new EventEmitter<any>();

  onSelectMovie(movie: any): void {
    this.updateSelectedMovie.emit(movie);
  }
}

