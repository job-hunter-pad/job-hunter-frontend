import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ResendInvitationComponent } from './authentication/resend-invitation/resend-invitation.component'
import { ValidateEmailComponent } from './authentication/validate-email/validate-email.component';
import { HomeComponent } from './home/home.component';
import { CreateJobOfferFormComponent } from './jobs/create-job-offer-form/create-job-offer-form.component';
import { EmployerProfileComponent } from './profiles/employer-profile/employer-profile.component';
import { FreelancerProfileComponent } from './profiles/freelancer-profile/freelancer-profile.component';
import { AuthGuard } from './shared/auth-guard';
import { AddReviewComponent } from './shared/payment/add-review/add-review.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'resendInvitation',
    component: ResendInvitationComponent
  },
  {
    path: 'validateEmail/:token',
    component: ValidateEmailComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employerProfile/:userId',
    component: EmployerProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'freelancerProfile/:userId',
    component: FreelancerProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createJob',
    component: CreateJobOfferFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addReview/:reviewerId/:receiverId', component: AddReviewComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
