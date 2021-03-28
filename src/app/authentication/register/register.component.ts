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
  passwordsDontMatch = false;

  constructor( 
    private formBuilder: FormBuilder,
    private router:Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['', [Validators.required]]
    });
  }

  onSubmit() {

    if(this.matchPasswords(this.registerForm.get('password'), this.registerForm.get('confirmPassword'))) {
      this.authService.register
      ( this.registerForm.get('name').value, 
        this.registerForm.get('email').value,
        this.registerForm.get('password').value,
        this.registerForm.get('userType').value
      ).subscribe( res => {
        //if(emailul nu e deja folosit) this.router.navigate.(['/undeva']);
        //else 
          this.usedEmail = true;
      })
    }
    else
      this.passwordsDontMatch = true;
  }

  matchPasswords(password, confirmPassword) {
    return password === confirmPassword;
  }
}
