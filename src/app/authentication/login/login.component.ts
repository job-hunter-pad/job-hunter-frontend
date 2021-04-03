import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  error = false;
  errorMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
        (res: any) => {
          if (res.success) {
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
}