import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { CinemaComponent } from './cinema/cinema.component';
import { DateComponent } from './date/date.component';
import { TimeComponent } from './time/time.component';



@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ShowcaseComponent,
    CinemaComponent,
    DateComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

