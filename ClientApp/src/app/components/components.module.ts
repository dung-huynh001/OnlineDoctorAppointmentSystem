import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AreaChartsComponent } from './area-charts/area-charts.component';
import { DonutChartsComponent } from './donut-charts/donut-charts.component';
import { BaseChartDirective } from 'ng2-charts';
import { NgApexchartsModule} from 'ng-apexcharts';
import { AppointmentStatisticComponent } from './appointment-statistic/appointment-statistic.component'
import { CountUpModule } from 'ngx-countup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppointmentFormComponent,
    AreaChartsComponent,
    DonutChartsComponent,
    AppointmentStatisticComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseChartDirective,
    NgApexchartsModule,
    CountUpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AppointmentFormComponent, 
    DonutChartsComponent, 
    AreaChartsComponent, 
    AppointmentStatisticComponent
  ]
})
export class ComponentsModule { }
