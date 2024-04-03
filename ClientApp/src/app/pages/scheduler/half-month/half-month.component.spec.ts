import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfMonthComponent } from './half-month.component';

describe('HalfMonthComponent', () => {
  let component: HalfMonthComponent;
  let fixture: ComponentFixture<HalfMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HalfMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HalfMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
