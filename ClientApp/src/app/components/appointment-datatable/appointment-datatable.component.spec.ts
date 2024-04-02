import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDatatableComponent } from './appointment-datatable.component';

describe('AppointmentDatatableComponent', () => {
  let component: AppointmentDatatableComponent;
  let fixture: ComponentFixture<AppointmentDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentDatatableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
