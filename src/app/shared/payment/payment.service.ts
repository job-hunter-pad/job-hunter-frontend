import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { UserProfileService } from 'src/app/profiles/user-profile.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private profileService: UserProfileService) { }

  private checkoutUrl = '/api/payment/checkout';

  stripePromise = loadStripe(environment.stripe);

  async checkout(jobId, jobName, employerId, freelancerId, amount) {

    if (!jobId || !employerId || !freelancerId) {
      console.error("Unable to start Checkout")
      return
    }

    var employerExists = true;
    await this.profileService.profileExists(employerId).toPromise().catch(() => employerExists = false);

    if (!employerExists) {
      console.error("Employer not found!");
      return
    }

    var freelancerExists = true;
    await this.profileService.profileExists(freelancerId).toPromise().catch(() => freelancerExists = false);

    if (!freelancerExists) {
      console.error("Freelancer not found!");
      return
    }

    console.log(employerExists)
    console.log(freelancerExists)
    return;

    const payment = {
      jobId: jobId,
      jobName: jobName,
      employerId: employerId,
      freelancerId: freelancerId,
      amount: amount,
      cancelUrl: window.location.href,
      successUrl: window.location.origin + `/addReview/${employerId}/${freelancerId}`,
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    this.http
      .post(this.checkoutUrl, payment)
      .subscribe((data: any) => {

        // redirect To Checkout page of Stripe platform
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
}
