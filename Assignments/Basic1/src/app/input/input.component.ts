import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  username = '';
  emptyString = true;

  // constructor() {
  //   setTimeout(() => {
  //     this.emptyString = false;
  //   }, 2000);
  // }

  onUpdate(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
    if (this.username !== '') {
      this.emptyString = false;
    } else {
      this.emptyString = true;
    }
  }

  onButtonClick(event: Event) {
    this.username = '';
    this.emptyString = true;
  }
}
