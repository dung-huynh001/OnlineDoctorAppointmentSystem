import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignScheduleComponent } from './assign-schedule.component';

describe('AssignScheduleComponent', () => {
  let component: AssignScheduleComponent;
  let fixture: ComponentFixture<AssignScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
