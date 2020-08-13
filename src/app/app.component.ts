import { Component } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { interval } from "rxjs";
import { startWith } from "rxjs/operators";

const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_VALIDATOR: ValidatorFn = ({ value }) =>
  EMAIL.test(value.toLowerCase()) ? null : { email: "Enter valid email" };
const PHONE_VALIDATOR: ValidatorFn = ({ value }) =>
  /^\d+$/.test(value) ? null : { phone: "Enter valid phone" };

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  type = "Email";

  readonly group = new FormGroup({
    name: new FormControl("", Validators.required),
    contact: new FormControl("", Validators.required)
  });

  readonly validation$ = this.group.statusChanges.pipe(
    startWith(this.group.status)
  );

  get validator(): ValidatorFn {
    return this.type === 'Email'
      ? Validators.email 
      : Validators.pattern(/^\d+$/);
  }
}
