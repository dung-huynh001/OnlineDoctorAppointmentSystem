import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DayComponent } from './day/day.component';
import { HalfMonthComponent } from './half-month/half-month.component';
import { WeekComponent } from './week/week.component';
import { MonthComponent } from './month/month.component';

const routes: Routes = [
  {
    path: 'day',
    component: DayComponent
  },
  {
    path: 'month',
    component: MonthComponent
  },
  {
    path: 'week',
    component: WeekComponent
  },
  {
    path: 'half-month',
    component: HalfMonthComponent
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }
