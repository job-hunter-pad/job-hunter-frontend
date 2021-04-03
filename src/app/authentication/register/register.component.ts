import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;
  usedEmail = false;
  errorMessage;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['', [Validators.required]]
    }, {
      validator: this.matchPasswordsValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register
        (this.registerForm.get('name').value,
          this.registerForm.get('email').value,
          this.registerForm.get('password').value,
          this.registerForm.get('userType').value
        ).subscribe(
          (res: any) => {
            console.log(res)
            if (res.success) {
              this.router.navigate(['']);
            }
            else {
              this.errorMessage = res.fail_message;
              this.usedEmail = true;
            }
          });
    }
  }

  matchPasswordsValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
