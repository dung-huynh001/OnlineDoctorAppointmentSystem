import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalProcessComponent } from './medical-process.component';

describe('MedicalProcessComponent', () => {
  let component: MedicalProcessComponent;
  let fixture: ComponentFixture<MedicalProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
