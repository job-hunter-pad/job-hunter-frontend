import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { JobsService } from '../jobs.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewDialogComponent } from 'src/app/profiles/add-review-dialog/add-review-dialog.component';
import { UserProfileService } from 'src/app/profiles/user-profile.service';

@Component({
	selector: 'app-applied-jobs',
	templateUrl: './applied-jobs.component.html',
	styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {

	ownProfile = false;
	inProgressJobs = [];

	private id: string;

	constructor(
		private route: ActivatedRoute,
		private jobsService: JobsService,
		private authenticationService: AuthenticationService,
		private addReviewDialog: MatDialog,
		private profileService: UserProfileService) { }

	@ViewChild('profilePhotoFileInput') profilePhotoFileInput: ElementRef;

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('freelancerId');

		const userData = this.authenticationService.getUserData();
		if (userData.userId == this.id) {
			this.ownProfile = true;
		}

		if (!this.ownProfile) {
			return;
		}

		this.jobsService.getInProgressJobsOfFreelancer(this.id).subscribe((jobs: any) => {
			this.inProgressJobs = jobs;
		});
	}

	getApplicationFromJob(job) {
		for (let i = 0; i < job.applications.length; i++) {
			if (job.applications[i].status == "ACCEPTED" || job.applications[i].status == "COMPLETED") {
				return job.applications[i];
			}
		}
		return undefined;
	}

	completeJob(job) {

		const dialogRef = this.addReviewDialog.open(AddReviewDialogComponent, {
			data: {
				employerName: job.employerName,
				review: {
					rating: 0,
					description: ""
				}
			},
			width: '500px'
		});

		dialogRef.afterClosed().subscribe((review) => {
			this.jobsService.completeJob(this.id, job.id).subscribe(application => {
				this.jobsService.getInProgressJobsOfFreelancer(this.id).subscribe((jobs: any) => {
					this.inProgressJobs = jobs;
				});
			})

			if (!review) {
				return;
			}
			if (!review.description && !review.rating) {
				return;
			}

			this.profileService.getFreelancerProfileById(this.id).subscribe(profile => {
				this.profileService.addReview(job.employerId, profile.name, review.rating, review.description).subscribe(() => {
				})
			});
		})
	}
}
