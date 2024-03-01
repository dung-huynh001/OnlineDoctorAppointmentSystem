import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';



@NgModule({
  declarations: [
    AppointmentFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AppointmentFormComponent]
})
export class ComponentsModule { }
