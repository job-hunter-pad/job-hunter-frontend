import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { contentHeaders } from '../shared/headers';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

	private applyUrl = "/api/apply";

  private jwtHelper = new JwtHelperService();

	isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {	}

  apply(hours,price){
    return this.http.post(
			this.applyUrl,
			JSON.stringify({ hours: hours, price: price }), {
			headers: contentHeaders
    });
	}
  
}
