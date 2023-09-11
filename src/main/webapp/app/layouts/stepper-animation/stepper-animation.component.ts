import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-stepper-animation',
  templateUrl: './stepper-animation.component.html',
  styleUrls: ['./stepper-animation.component.scss'],
})
export class StepperAnimationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

function nextStep() {
  // @ts-ignore
  let currentStep: HTMLElement = document.querySelector('.step[data-step="1"]');
  // @ts-ignore
  let nextStep: HTMLElement = document.querySelector('.step[data-step="2"]');
  // @ts-ignore
  let bubble: HTMLElement = document.querySelector('.bubble');

  currentStep.style.display = 'none';
  nextStep.style.display = 'block';
  bubble.style.transform = 'translateX(100%)';
}
