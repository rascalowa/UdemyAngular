import { CustomValidators } from './custom-validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenName: ['Test'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName], CustomValidators.asyncInvalidProjectName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical')
    });
  }

  onSubmit() {
    console.log(this.projectForm.value)
  }
  //Synchronous Custom Validator
  // forbiddenNameCheck(control: FormControl): { [s: string]: boolean } {
  //   if (control.value === "Test") {
  //     return { 'nameIsForbidden': true }
  //   }
  // }

  //Asynchronous Custom Validator
  // forbiddenNameCheck(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === "Test") {
  //         resolve({ 'nameIsForbidden': true })
  //       } else {
  //         resolve(null)
  //       }
  //     }, 1500)
  //   })
  //   return promise
  // }
}
