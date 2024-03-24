import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentOnSiteComponent } from './appointment-on-site.component';

describe('AppointmentOnSiteComponent', () => {
  let component: AppointmentOnSiteComponent;
  let fixture: ComponentFixture<AppointmentOnSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentOnSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentOnSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
