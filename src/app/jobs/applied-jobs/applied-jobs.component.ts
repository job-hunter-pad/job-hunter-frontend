import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { JobsService } from '../jobs.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
		private snackBar: MatSnackBar) { }

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
			if (job.applications[i].status == "ACCEPTED") {
				return job.applications[i];
			}
		}
		return undefined;
	}

	completeJob(job) {
		this.jobsService.completeJob(this.id, job.id).subscribe(application => {
			this.jobsService.getInProgressJobsOfFreelancer(this.id).subscribe((jobs: any) => {
				this.inProgressJobs = jobs;
			});
		})
	}
}
