import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AreaChartsComponent } from './area-charts/area-charts.component';
import { DonutChartsComponent } from './donut-charts/donut-charts.component';
import { BaseChartDirective } from 'ng2-charts';
import { NgApexchartsModule} from 'ng-apexcharts'


@NgModule({
  declarations: [
    AppointmentFormComponent,
    AreaChartsComponent,
    DonutChartsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseChartDirective,
    NgApexchartsModule,
  ],
  exports: [AppointmentFormComponent, DonutChartsComponent, AreaChartsComponent]
})
export class ComponentsModule { }
