import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../shared/headers'
import { Observable } from 'rxjs';
import { JobOffer } from './jobOffer';

@Injectable({
	providedIn: 'root'
})

export class JobsService {

	private createJobUrl = '/api/jobs/create';
	private getJobAllOffersUrl = '/api/jobs';
	private rejectApplicationUrl = "/api/jobs/rejectApplication/";
	private acceptApplicationUrl = "/api/jobs/acceptApplication/";

	private activeJobsUrl = '/api/applications/activeJobs';
	private getNotCompletedJobOffersByEmployerIdUrl = '/api/jobs/getNotCompletedJobOffers/';
	private getCompletedJobOffersByFreelancerIdUrl = "/api/applications/completedJobs/";
	private getInProgressJobsOfFreelancerUrl = '/api/applications/inProgressJobs/';
	private completeJobUrl = '/api/applications/complete';

	constructor(private http: HttpClient) { }

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

	getCompletedJobsByFreelancerId(id) {
		return this.http.get(
			this.getCompletedJobOffersByFreelancerIdUrl + id,
			{
				headers: contentHeaders
			}
		);
	}

	getInProgressJobsOfFreelancer(freelancerId) {
		return this.http.get(this.getInProgressJobsOfFreelancerUrl + freelancerId,
			{
				headers: contentHeaders
			});
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

	completeJob(freelancerId, jobId) {
		return this.http.post(`${this.completeJobUrl}/${freelancerId}/${jobId}`, null, {
			headers: contentHeaders
		});
	}
}
