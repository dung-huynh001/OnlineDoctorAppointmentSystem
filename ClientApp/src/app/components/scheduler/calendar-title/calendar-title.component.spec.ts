import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTitleComponent } from './calendar-title.component';

describe('CalendarTitleComponent', () => {
  let component: CalendarTitleComponent;
  let fixture: ComponentFixture<CalendarTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
