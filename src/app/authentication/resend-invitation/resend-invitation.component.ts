import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resend-invitation',
  templateUrl: './resend-invitation.component.html',
  styleUrls: ['./resend-invitation.component.scss']
})
export class ResendInvitationComponent implements OnInit {

  resendInvitationForm: FormGroup;
  hide = true;
  error = false;
  errorMessage;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.resendInvitationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]});
  }
  onSubmit() {
    if (this.resendInvitationForm.valid) {
      this.authService.resendInvitation(this.resendInvitationForm.get('email').value)
    }
  }
}
