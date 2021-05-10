import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { JOBS } from '../mock-jobs'
import { contentHeaders } from '../shared/headers'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JobOffer } from './jobOffer';

@Injectable({
	providedIn: 'root'
})

export class JobsService {

	private createJobUrl = '/api/jobs/create';

	private getJobAllOffersUrl = '/api/jobs';

	private getNotCompletedJobOffersByEmployerIdUrl = '/api/jobs/getNotCompletedJobOffers/';

	private getCompletedJobOffersByFreelancerIdUrl = "/api/applications/completedJobs/";

	constructor(private http: HttpClient) { }

	getAllJobOffers(): Observable<JobOffer[]> {
		return this.http.get<JobOffer[]>(this.getJobAllOffersUrl)
	}

	getNotCompletedJobOffersByEmployerId(id): Observable<JobOffer[]> {
		return this.http.get<JobOffer[]>(
			this.getNotCompletedJobOffersByEmployerIdUrl + id,
			{
				headers: contentHeaders
			}
		);
	}

	getCompletedJobOffersByFreelancerId(id): Observable<JobOffer[]> {
		return this.http.get<JobOffer[]>(
			this.getCompletedJobOffersByFreelancerIdUrl + id,
			{
				headers: contentHeaders
			}
		);
	}

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
