import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';


const routes: Routes = [
  { path: 'seat-selection', component: SeatSelectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
