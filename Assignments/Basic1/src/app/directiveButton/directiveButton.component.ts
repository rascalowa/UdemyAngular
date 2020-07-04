import { Component } from '@angular/core';

@Component({
  selector: 'app-directiveb',
  templateUrl: './directiveButton.component.html',
  styleUrls: ['./directiveButton.component.css'],
})
export class DirectiveButtonComponent {
  many = 0;
  clickedArray = [];

  onClick(event: Event) {
    this.many = this.many + 1;
    // this.clickedArray.push(this.many);
    this.clickedArray.push(new Date());
    console.log(this.clickedArray);
  }

  getColor() {
    if (this.many < 5) {
      return 'white';
    }
    return 'blue';
  }
}
