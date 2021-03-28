import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent implements OnInit {

  token;
  message; 
  spin = true;

  constructor(private route:ActivatedRoute, private authService:AuthenticationService) { }

  ngOnInit(): void {
    delay(1000);
    this.spin = false;
    this.token = this.route.snapshot.paramMap.get('token');
    this.authService.validateEmail(this.token).subscribe(
      (res:any) => {
        this.spin = false;
        this.message = res.message;
      }
    )
  }

}
