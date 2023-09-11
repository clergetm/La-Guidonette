import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperAnimationComponent } from './stepper-animation.component';

describe('StepperAnimationComponent', () => {
  let component: StepperAnimationComponent;
  let fixture: ComponentFixture<StepperAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
