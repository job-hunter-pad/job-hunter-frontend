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

  constructor(private router: Router, public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onViewProfileButtonClick() {
    const userData = this.authService.getUserData();
    if (userData.userType == "EMPLOYER") {
      this.router.navigate(['/employerProfile', userData.userId]);
    }
  }

  onLogoutButtonClick() {
    this.authService.logout();
  }

}
