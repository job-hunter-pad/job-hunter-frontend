import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserProfileService } from 'src/app/profiles/user-profile.service';
import { SkillsService } from 'src/app/shared/skills.service';
import { JobOffer } from '../jobOffer';
import { JobsService } from '../jobs.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-create-job-offer-form',
	templateUrl: './create-job-offer-form.component.html',
	styleUrls: ['./create-job-offer-form.component.scss']
})
export class CreateJobOfferFormComponent implements OnInit {

	separatorKeysCodes: number[] = [ENTER, COMMA];

	jobOfferForm: FormGroup;
	jobOffer: JobOffer;

	skills: string[] = [];
	allSkills = [];
	filteredSkills: Observable<string[]>;

	@ViewChild('skillInput') fruitInput: ElementRef<HTMLInputElement>;
	@ViewChild('auto') matAutocomplete: MatAutocomplete;

	constructor(
		private fb: FormBuilder,
		private skillsService: SkillsService,
		private jobService: JobsService,
		private profileService: UserProfileService,
		private authService: AuthenticationService,
		private router: Router,
		private snackBar: MatSnackBar) { }

	ngOnInit(): void {
		const userData = this.authService.getUserData();

		this.jobOffer = {
			employerId: userData.userId,
			date: formatDate(new Date(), "dd/MM/yyyy", 'en'),
			employerName: "",
			hourSalaryAmount: 1,
			jobDescription: "",
			jobName: "",
			skills: [],
			status: "",
			applications: []
		}

		this.jobOfferForm = this.fb.group({
			jobName: ['', [Validators.required]],
			jobDescription: ['', [Validators.required]],
			hourSalaryAmount: ['', [Validators.required, Validators.min(1)]],
			jobSkills: ['']
		});


		this.skillsService.getSkills().subscribe(skills => {
			this.allSkills = skills;

			this.filteredSkills = this.jobSkills.valueChanges.pipe(
				map((skill: string | null) => {
					if (skill) {
						return this._filter(skill)
					}
					return this.allSkills.slice();
				}));
		})

		this.profileService.getEmployerProfileById(userData.userId).subscribe(profile => {
			this.jobOffer.employerName = profile.name;
		})
	}

	onCreateJobButtonClick() {
		this.jobOffer.jobName = this.jobOfferForm.value.jobName;
		this.jobOffer.jobDescription = this.jobOfferForm.value.jobDescription;
		this.jobOffer.hourSalaryAmount = this.jobOfferForm.value.hourSalaryAmount;
		this.jobOffer.skills = this.skills;
		this.jobOffer.status = "PENDING";
		this.jobOffer.applications = [];

		this.jobService.createJobOffer(this.jobOffer).subscribe(res => {
			this.snackBar.open("Job Offer Created Successfully", "Close", {
				duration: 2000,
				horizontalPosition: "center",
				verticalPosition: "top"
			});
			this.router.navigate(['/']);
		}, (error) => {
			this.snackBar.open("An Error Occured While Creating Job Offer", "Close", {
				duration: 2000,
				horizontalPosition: "center",
				verticalPosition: "top"
			});
		});
	}

	get hourSalaryAmount() {
		return this.jobOfferForm.get('hourSalaryAmount');
	}

	get jobSkills() {
		return this.jobOfferForm.get('jobSkills');
	}

	remove(fruit: string): void {
		const index = this.skills.indexOf(fruit);

		if (index >= 0) {
			this.skills.splice(index, 1);
		}
	}

	optionSelected(event: MatAutocompleteSelectedEvent): void {
		if (this.skills.indexOf(event.option.viewValue) == -1) {
			this.skills.push(event.option.viewValue);
		}
		this.fruitInput.nativeElement.value = '';
		this.jobSkills.setValue(null);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allSkills
			.filter(skill => this.skills.indexOf(skill) == -1)
			.filter(skill =>
				skill.toLowerCase().includes(filterValue)
			);
	}
}
