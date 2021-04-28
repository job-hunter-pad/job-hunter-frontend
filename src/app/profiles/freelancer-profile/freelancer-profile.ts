import { JobOffer } from "src/app/jobs/jobOffer";
import { Review } from "../review-array/review";

export class FreelancerProfile {
    userId: string;
    email: string;
    name: string;
    location: string;
    description: string;
    phoneNumber: string;
    reviews: Review[];
    skills: string[];
    // completedJobOffers: JobOffer[];
}