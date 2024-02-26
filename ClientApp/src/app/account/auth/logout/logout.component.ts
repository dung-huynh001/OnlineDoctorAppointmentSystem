import lottie from 'lottie-web'

import { Component } from '@angular/core';
import { defineElement } from 'lord-icon-element';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  year: number = new Date().getFullYear();

  constructor() {
    defineElement(lottie.loadAnimation);
  }

  ngOnInit(): void {
  }
}
