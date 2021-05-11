import { JobApplication } from "./jobApplication";

export interface JobOffer {
    id?: string;
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