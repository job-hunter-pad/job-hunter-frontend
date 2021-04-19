import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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

import { BarRatingModule } from "ngx-bar-rating";

import { HomeComponent } from './home/home.component';
import { EmployerProfileComponent } from './profiles/employer-profile/employer-profile.component';
import { FreelancerProfileComponent } from './profiles/freelancer-profile/freelancer-profile.component';

import { ReviewArrayComponent } from './profiles/review-array/review-array.component';

import { ListElementComponent } from './home/list-element/list-element.component';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    ListElementComponent

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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
