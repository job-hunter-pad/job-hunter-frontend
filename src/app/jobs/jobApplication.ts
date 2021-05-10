export interface JobApplication {
    id: string;
    jobId: string;
    freelancerId: string;
    freelancerName: string;
    hourSalaryAmount: number;
    estimatedProjectCompleteTime: number;
    message: string;
    status: string;
}