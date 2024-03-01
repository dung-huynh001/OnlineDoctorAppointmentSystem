import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOfDoctorsComponent } from './schedule-of-doctors.component';

describe('ScheduleOfDoctorsComponent', () => {
  let component: ScheduleOfDoctorsComponent;
  let fixture: ComponentFixture<ScheduleOfDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleOfDoctorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleOfDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
