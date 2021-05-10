import { JobApplication } from "./jobApplication";

export interface JobOffer {
    jobName: string;
    jobDescription: string;
    date: string;
    employerId: string;
    employerName: string;
    hourSalaryAmount: number;
    skills: string[];
    status: string;
    applications: JobApplication[];
}