import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
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
	private activeJobsUrl = '/api/applications/activeJobs';

	private getNotCompletedJobOffersByEmployerIdUrl = '/api/jobs/getNotCompletedJobOffers/';

	private getCompletedJobOffersByFreelancerIdUrl = "/api/applications/completedJobs/";

	private rejectApplicationUrl = "/api/jobs/rejectApplication/";

	private acceptApplicationUrl = "/api/jobs/acceptApplication/";

	constructor(private http: HttpClient) { }

	//TODO pe home page ne trebuie toate active jobs - faci functie si o apeezi in home page

	getAllActiveJobs() {
		return this.http.get<JobOffer[]>(this.activeJobsUrl,
			{
				headers: contentHeaders
			})
	}

	getAllJobOffers(): Observable<JobOffer[]> {
		return this.http.get<JobOffer[]>(this.getJobAllOffersUrl,
			{
				headers: contentHeaders
			})
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

	createJobOffer(jobOffer) {
		return this.http.post(
			this.createJobUrl,
			JSON.stringify(jobOffer), {
			headers: contentHeaders
		});
	}

	acceptApplication(jobOfferId, applicationId) {
		return this.http.post(
			this.acceptApplicationUrl + jobOfferId + "/" + applicationId,
			JSON.stringify({ jobId: jobOfferId, applicationId: applicationId }), {
			headers: contentHeaders
		});
	}

	rejectApplication(jobOfferId, applicationId) {
		return this.http.post(
			this.rejectApplicationUrl + jobOfferId + "/" + applicationId,
			JSON.stringify({ jobId: jobOfferId, applicationId: applicationId }), {
			headers: contentHeaders
		});
	}
}
