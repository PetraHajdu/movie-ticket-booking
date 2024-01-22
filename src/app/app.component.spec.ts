import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'movie-ticket-booking'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('movie-ticket-booking');
  });

  it('should update selected date when calling updateSelectedDate', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const date = { d: '2023.12.13.' };
    app.updateSelectedDate(date);
    expect(app.selectedDate).toEqual(date);
  });

  it('should update selected movie when calling updateSelectedMovie', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const movie = { id: 1, name: 'Napoleon 2D' };
    app.updateSelectedMovie(movie);
    expect(app.selectedMovie).toEqual(movie);
  });

  it('should update selected seats when calling updateSelectedSeats', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const seat = 1;
    app.selectedDate = { d: '2023.12.13.' };
    app.selectedMovie = {
      showtimes: [{ date: '2023.12.13.', time: '09:30', price: 8, occupied: [] }],
    };
    app.updateSelectedSeats(seat);
    expect(app.selectedSeats).toEqual([seat]);

    app.updateSelectedSeats(seat);
    expect(app.selectedSeats).not.toEqual([seat]);
  });

  it('should calculate total price correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.selectedDate = { d: '2023.12.13.' };
    app.selectedMovie = {
      showtimes: [{ date: '2023.12.13.', time: '09:30', price: 8, occupied: [] }],
    };
    app.selectedTime = { t: '09:30' };
    app.selectedSeats = [1, 2, 3];

    const totalPrice = app.getTotalPrice();
    expect(totalPrice).toEqual(24);
  });

  it('should handle booking now', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(app.alertService, 'showAlert');

    app.selectedDate = { d: '2023.12.13.' };
    app.selectedMovie = { showtimes: [{ date: '2023.12.13.', time: '09:30', price: 8, occupied: [] }] };
    app.selectedTime = { t: '09:30' };
    app.selectedSeats = [4, 5, 6];

    app.handleBookingNow();
    expect(app.alertService.showAlert).toHaveBeenCalledWith('Booking Successful', 'Your booking was successful!');
  });


});
