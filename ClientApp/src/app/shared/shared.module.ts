import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { EditorComponent } from './editor/editor.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    EditorComponent,
    ToastContainerComponent
  ],
  imports: [
    CommonModule,
    FlatpickrModule.forRoot(),
    NgxMaskDirective, 
    NgxMaskPipe,
    NgbToastModule,
    RouterModule
  ],
  exports: [
    BreadcrumbsComponent,
    EditorComponent,
    ToastContainerComponent,
  ],
  providers:[
    provideNgxMask(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
