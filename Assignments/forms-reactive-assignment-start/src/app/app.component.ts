import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  forbiddenName: ['Test'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required, this.forbiddenNameCheck]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null)
    })
  }

  onSubmit() {
    console.log(this.signupForm.value)
  }
  //Synchronous Custom Validator DOESN"T WORK AND I DON"T KNOW WHYYYY
  // forbiddenNameCheck(control: FormControl): { [s: string]: boolean } {
  //   if (this.forbiddenName.indexOf(control.value)) {
  //     return { 'nameIsForbidden': true }
  //   }
  // }

  //Asynchronous Custom Validator INVALID ANYTHING TYPEN IN
  forbiddenNameCheck(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Test") {
          resolve({ 'nameIsForbidden': true })
        } else {
          resolve(null)
        }
      }, 1500)
    })
    return promise
  }
}
