import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  hide = true;
  error = false;
  errorMessage;
  token;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute, 
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.matchPasswordsValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.token = this.route.snapshot.paramMap.get('token');
      this.authService.resetPassword(this.resetPasswordForm.get('password').value, this.token).subscribe(
        (res: any) => {
          if (res.success) {
            this.snackBar.open("Reset Password Succesfully", "Close", {
              duration: 2000,
              horizontalPosition: "center",
              verticalPosition: "top"
            });
            this.router.navigate(['']);
          }
          else {
            this.errorMessage = res.fail_message;
            this.error = true;
          }
        }
      );
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
