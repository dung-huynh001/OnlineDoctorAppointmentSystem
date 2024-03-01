import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorComponent } from './editor/editor.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, IConfig } from 'ngx-mask';
import { TablesModule } from './tables/tables.module';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    EditorComponent,
    DatepickerComponent,
    TimepickerComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    FlatpickrModule.forRoot(),
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  exports: [
    BreadcrumbsComponent,
    EditorComponent,
    DatepickerComponent,
    TimepickerComponent,
    TablesModule
  ],
  providers:[
    provideNgxMask(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
