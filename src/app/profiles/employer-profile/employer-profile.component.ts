import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { JobOffer } from 'src/app/jobs/jobOffer';
import { JobsService } from 'src/app/jobs/jobs.service';
import { UserProfileService } from '../user-profile.service';
import { EmployerProfile } from './employer-profile';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent {

  imageSrc = null;
  ownProfile = false;
  isEditing = false;
  showUserNotFoundError = false;
  rowHeight = "20vh";
  employerProfile: EmployerProfile;
  id: string;
  jobOffers: JobOffer[] = [];
  freelancerDisplayedJobOffers: JobOffer[] = [];
  searchText;

  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private authenticationService: AuthenticationService,
    private userProfileService: UserProfileService,
    private snackBar: MatSnackBar) { }

  @ViewChild('profilePhotoFileInput') profilePhotoFileInput: ElementRef;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('userId');
    this.userProfileService.getEmployerProfileById(this.id).subscribe(employerProfile => {
      this.employerProfile = employerProfile;
      if (!this.employerProfile.description) {
        this.employerProfile.description = "";
      }
    }, (error: any) => {
      if (error.status == 404) {
        this.showUserNotFoundError = true;
      }
    })

    this.userProfileService.getProfilePhoto(this.id).subscribe(photoBlob => {
      this.createImageFromBlob(photoBlob);
    })

    const userData = this.authenticationService.getUserData();
    if (userData.userId == this.id) {
      this.ownProfile = true;
    }

    this.jobsService.getNotCompletedJobOffersByEmployerId(this.id).subscribe(jobArray => {
      this.jobOffers = jobArray
      this.extractFreelancerDisplay();
    })
  }

  createImageFromBlob(image: Blob) {

    if (image) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageSrc = reader.result;
      }, false);

      reader.readAsDataURL(image);
    }
  }

  editProfile() {
    this.isEditing = true;
    this.rowHeight = "30vh";
  }

  saveProfileAndShowSnackbar() {
    this.isEditing = false;
    this.rowHeight = "20vh";
    this.saveProfile();
  }

  uploadPhoto(files) {
    this.userProfileService.updateProfilePhoto(this.id, files[0]).subscribe(
      (res) => {
        this.createImageFromBlob(files[0]);
      },
      (err) => {
        console.log(err);
      });
  }

  openProfilePhotoDialog() {
    this.profilePhotoFileInput.nativeElement.click();
  }

  refreshPage() {
    this.jobsService.getNotCompletedJobOffersByEmployerId(this.id).subscribe(jobArray => {
      // console.log(jobArray);
      this.jobOffers = jobArray
    })
  }

  private extractFreelancerDisplay() {
    this.jobOffers.forEach((job) => {
      if (job.status == "PENDING") {
        this.freelancerDisplayedJobOffers.push(job);
      }
    });
  }

  private saveProfile() {
    this.userProfileService.updateEmployerProfile(
      this.id,
      this.employerProfile.name,
      this.employerProfile.description,
      this.employerProfile.location,
      this.employerProfile.phoneNumber).subscribe((res) => {
        this.isEditing = false;
        this.snackBar.open("Profile saved", "Close", {
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "top"
        });
      });
  }
}
