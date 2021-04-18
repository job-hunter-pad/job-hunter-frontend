import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../user-profile.service';
import { EmployerProfile } from './employer-profile';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent {

  show = false;
  showUserNotFoundError = false;
  employerProfile: EmployerProfile;

  constructor(private route: ActivatedRoute, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('userId');
    this.userProfileService.getEmployerProfileById(id).subscribe(employerProfile => {
      this.employerProfile = employerProfile;
    }, (error: any) => {
      if (error.status == 404) {
        this.showUserNotFoundError = true;
      }
    })
  }

}
