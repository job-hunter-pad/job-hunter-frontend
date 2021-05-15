import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../review-array/review';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})

export class AddReviewComponent implements OnInit {

  review: Review;
  reviewerId: String;
  receiverId: String;
  freelancerName: String;

  constructor(
    private profileService: UserProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.reviewerId = this.route.snapshot.paramMap.get('reviewerId');
    this.receiverId = this.route.snapshot.paramMap.get('receiverId');

    this.review = {
      reviewScore: 0,
      description: "",
      reviewerName: "",
    }

    this.profileService.getEmployerProfileById(this.reviewerId).subscribe(employerProfile => {
      if (employerProfile.name) {
        this.review.reviewerName = employerProfile.name;
      }
    });

    this.profileService.getFreelancerProfileById(this.receiverId).subscribe(freelancerProfile => {
      if (freelancerProfile.name) {
        this.freelancerName = freelancerProfile.name;
      }
    })
  }

  addReview() {
    this.profileService.addReview(this.receiverId, this.review.reviewerName, this.review.reviewScore, this.review.description).subscribe(() => { });
    this.router.navigate(['']);
  }

}
