import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesUrl = 'assets/movies.json';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.moviesUrl);
  }

  getMoviesByDate(date: string): Observable<any[]> {
    return this.getMovies().pipe(
      map((movies) => movies.filter((movie) => movie.dates.includes(date)))
    );
  }

  getMovieTimes(movieId: number): Observable<string[]> {
    return this.getMovies().pipe(
      map((movies) => {
        const movie = movies.find((m) => m.id === movieId);
        return movie ? movie.times : [];
      })
    );
  }
}

