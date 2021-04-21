import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { JOBS } from '../mock-jobs'
import { contentHeaders } from '../shared/headers'

@Injectable({
	providedIn: 'root'
})

export class JobsService {

	private createJobUrl = '/api/jobs/create';

	constructor(private http: HttpClient) { }

	getJobs() {
		return of(JOBS);
	}

	createJobOffer(jobOffer) {
		return this.http.post(
			this.createJobUrl,
			JSON.stringify(jobOffer), {
			headers: contentHeaders
		});
	}
}
