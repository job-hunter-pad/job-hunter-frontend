import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authentication/login/login.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { RegisterComponent } from './authentication/register/register.component';
import { ValidateEmailComponent } from './authentication/validate-email/validate-email.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';


import { BarRatingModule } from "ngx-bar-rating";

import { HomeComponent } from './home/home.component';
import { EmployerProfileComponent } from './profiles/employer-profile/employer-profile.component';
import { FreelancerProfileComponent } from './profiles/freelancer-profile/freelancer-profile.component';

import { ReviewArrayComponent } from './profiles/review-array/review-array.component';

import { ListElementComponent } from './home/list-element/list-element.component';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthInterceptor } from './http-interceptor';
import { AuthGuard } from './shared/auth-guard';

import { SearchBarPipe } from './home/search-bar/search-bar.pipe';
import { JobOfferComponent } from './home/job-offer/job-offer.component';
import { RenegotiatonComponent } from './home/job-offer/renegotiaton/renegotiaton.component';
import { CreateJobOfferFormComponent } from './jobs/create-job-offer-form/create-job-offer-form.component';
import { PastJobsComponent } from './profiles/freelancer-profile/past-jobs/past-jobs.component';

import { OffersListElementComponent } from './profiles/employer-profile/offers-list-element/offers-list-element.component';
import { StatusFilterPipe } from './profiles/employer-profile/status-filter.pipe';
import { ResendInvitationComponent } from './authentication/resend-invitation/resend-invitation.component';
import { AddReviewComponent } from './profiles/add-review/add-review.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ValidateEmailComponent,
    HomeComponent,
    EmployerProfileComponent,
    FreelancerProfileComponent,
    ReviewArrayComponent,
    ListElementComponent,
    SearchBarPipe,
    JobOfferComponent,
    RenegotiatonComponent,
    CreateJobOfferFormComponent,
    PastJobsComponent,
    ResendInvitationComponent,
    AddReviewComponent,
    OffersListElementComponent,
    StatusFilterPipe,
    ResendInvitationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatGridListModule,
    MatTabsModule,
    MatExpansionModule,
    BarRatingModule,
    MatGridListModule,
    MatListModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDividerModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
