import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileService } from '../user-profile.service';
import { FreelancerProfile } from './freelancer-profile';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SkillsService } from 'src/app/shared/skills.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { JobsService } from 'src/app/jobs/jobs.service';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.scss']
})
export class FreelancerProfileComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];

  imageSrc = null;
  ownProfile = true;
  isEditing = false;
  showUserNotFoundError = false;
  rowHeight = "180px";
  freelancerProfile: FreelancerProfile;
  id: string;

  skillsForm: FormGroup;
  allSkills = [];
  filteredSkills: Observable<string[]>;

  jobs = [];
  displayedJobs;

  constructor(
    private fb: FormBuilder,
    private jobService: JobsService,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private skillsService: SkillsService,
    private snackBar: MatSnackBar) { }

  @ViewChild('profilePhotoFileInput') profilePhotoFileInput: ElementRef;
  @ViewChild('skillInput') skillin: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit(): void {

    this.skillsForm = this.fb.group({
      freelancerSkills: ['']
    });

    this.id = this.route.snapshot.paramMap.get('userId');
    this.userProfileService.getFreelancerProfileById(this.id).subscribe(freelancerProfile => {
      this.freelancerProfile = freelancerProfile;
      if (!this.freelancerProfile.description) {
        this.freelancerProfile.description = "";
      }
    }, (error: any) => {
      if (error.status == 404) {
        this.showUserNotFoundError = true;
      }
    })

    this.skillsService.getSkills().subscribe(skills => {
      this.allSkills = skills;

      this.filteredSkills = this.freelancerSkills.valueChanges.pipe(
        map((skill: string | null) => {
          if (skill) {
            return this._filter(skill)
          }
          return this.allSkills.slice();
        }));
    })


    this.userProfileService.getProfilePhoto(this.id).subscribe(photoBlob => {
      this.createImageFromBlob(photoBlob);
    })

    this.jobService.getJobs().subscribe(jobArray => {
      this.jobs = jobArray; this.displayedJobs = jobArray;
      this.showJobs({ pageIndex: 0, pageSize: 2 });
    })
  }

  showJobs(event) {
    console.log(event);
    var start = event.pageIndex * event.pageSize;
    var end = start + event.pageSize;
    this.displayedJobs = this.jobs.slice(start, end)
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
    this.rowHeight = "230px";
  }

  saveProfileAndShowSnackbar() {
    this.isEditing = false;
    this.rowHeight = "180px";
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

  get freelancerSkills() {
    return this.skillsForm.get('freelancerSkills');
  }

  remove(skill: string): void {
    const index = this.freelancerProfile.skills.indexOf(skill);

    if (index >= 0) {
      this.freelancerProfile.skills.splice(index, 1);
    }
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    if (this.freelancerProfile.skills.indexOf(event.option.viewValue) == -1) {
      this.freelancerProfile.skills.push(event.option.viewValue);
    }
    this.skillin.nativeElement.value = '';
    this.freelancerSkills.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills
      .filter(skill => this.freelancerProfile.skills.indexOf(skill) == -1)
      .filter(skill =>
        skill.toLowerCase().includes(filterValue)
      );
  }

  private saveProfile() {
    this.userProfileService.updateFreelancerProfile(
      this.id,
      this.freelancerProfile.name,
      this.freelancerProfile.description,
      this.freelancerProfile.location,
      this.freelancerProfile.phoneNumber,
      this.freelancerProfile.skills).subscribe((res) => {
        this.isEditing = false;
        this.snackBar.open("Profile saved", "Close", {
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "top"
        });
      });
  }
}
