import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-hunter-frontend';
  userType;

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.userType = this.authService.getUserData().userType;
    })
  }

  onViewProfileButtonClick() {
    const userData = this.authService.getUserData();
    if (userData.userType == "EMPLOYER") {
      this.router.navigate(['/employerProfile', userData.userId]);
    }
    if (userData.userType == "FREELANCER") {
      this.router.navigate(['/freelancerProfile', userData.userId]);
    }
  }

  onLogoutButtonClick() {
    this.authService.logout();
  }

  navigatoeToMyJobs() {
    const userData = this.authService.getUserData();
    this.router.navigate(['/appliedJobs', userData.userId]);
  }
}
