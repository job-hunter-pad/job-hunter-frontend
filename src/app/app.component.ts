import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-hunter-frontend';

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {

      console.log(val);
      if (val instanceof NavigationEnd) {

        
        document.body.classList.remove('login-bg');
        document.body.classList.remove('register-bg');

        if (val.url == '/login') {
          // document.body.classList.add('login-bg');
        }
        else if (val.url == '/register') {
          // document.body.classList.add('register-bg');
        }
      }
    });
  }
}
