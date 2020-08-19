import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: true }) SubscriptionForm: NgForm;
  defaultPlan = 'advanced';

  onSubmit() {
    console.log(this.SubscriptionForm.value)
  }
}
