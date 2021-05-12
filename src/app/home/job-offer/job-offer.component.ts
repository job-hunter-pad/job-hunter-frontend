import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobOffer } from 'src/app/jobs/jobOffer';
import { RenegotiatonComponent } from './renegotiaton/renegotiaton.component'
import { HomeService } from '../home.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserProfileService } from 'src/app/profiles/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent implements OnInit {

  applications;
  applyForm: FormGroup;
  error = false;
  errorMessage;
  isEmployer = false;
  pushedButton = false;
  constructor(
    public dialogRef: MatDialogRef<JobOfferComponent>,

    @Inject(MAT_DIALOG_DATA) public data: JobOffer,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private authenticationService: AuthenticationService,
    private userProfileService: UserProfileService,
    private router: Router) { }

  ngOnInit(): void {
    this.applyForm = this.formBuilder.group({
      myPrice: [this.data.hourSalaryAmount],
      hours: ['', [Validators.required]],
      applyMessage: ['']
    })

    const userData = this.authenticationService.getUserData();
    if (userData.userType == "EMPLOYER") {
      this.isEmployer = true;
    }

  };


  openRenegotiation() {
    if (this.applyForm.valid) {
      var hours_value = this.applyForm.get('hours').value;
      var price_value = this.applyForm.get('myPrice').value;
      var message_value = this.applyForm.get('applyMessage').value;
      // console.log(hours_value); 
      // console.log(price_value);
      // console.log(message_value);
      // return;
      // console.log(this.data);
      this.pushedButton = true;
      const userData = this.authenticationService.getUserData();
      this.userProfileService.getFreelancerProfileById(userData.userId).subscribe(profile => {
        this.homeService.apply(this.data.id, userData.userId, profile.name, hours_value, price_value, message_value).subscribe(
          (res: any) => {
            this.pushedButton = false;
            // console.log(res);
            if (res) {
              this.dialog.open(RenegotiatonComponent, {
                width: '500px',
                height: '200px',
                data: null
              });
            }
            else {
              this.errorMessage = res.fail_message;
              this.error = true;
            }
          }
        );
      });

    }
  }

  navigateToEmployerProfile() {
    this.dialog.closeAll();
    this.router.navigate([`/employerProfile/${this.data.employerId}`]);
  }
}
