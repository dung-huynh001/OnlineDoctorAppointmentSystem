import lottie from 'lottie-web';
import { SharedModule } from './../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AreaChartsComponent } from './area-charts/area-charts.component';
import { DonutChartsComponent } from './donut-charts/donut-charts.component';
import { BaseChartDirective } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CountUpModule } from 'ngx-countup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppointmentDatatableComponent } from './appointment-datatable/appointment-datatable.component';
import { DataTablesModule } from 'angular-datatables';
import { defineElement } from 'lord-icon-element';

@NgModule({
  declarations: [
    AppointmentFormComponent,
    AreaChartsComponent,
    DonutChartsComponent,
    AppointmentDatatableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseChartDirective,
    NgApexchartsModule,
    CountUpModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule,
    NgxSpinnerModule,
    DataTablesModule,
  ],
  exports: [
    AppointmentFormComponent,
    DonutChartsComponent,
    AreaChartsComponent,
    AppointmentDatatableComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
