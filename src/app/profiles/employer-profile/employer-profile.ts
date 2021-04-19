import { Review } from "../review-array/review";

export class EmployerProfile {
    userId: string;
    email: string;
    name: string;
    location: string;
    description: string;
    phoneNumber: string;
    reviews: Review[];
}