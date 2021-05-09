import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { contentHeaders } from '../shared/headers'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private loginUrl = "/api/auth/login";
	private registerUrl = "/api/auth/register";
	private validateEmailUrl = '/api/auth/validateEmail';

	private jwtHelper = new JwtHelperService();

	isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient, private router: Router) {
		this.checkIfTokenIsNotExpired();
	}

	login(email, password) {
		return this.http.post(
			this.loginUrl,
			JSON.stringify({ email: email, password: password }), {
			headers: contentHeaders
		}
		).pipe(map((res: any) => {
			if (res.success) {
				localStorage.setItem('id_token', res.login_token);

				const decodedToken = this.jwtHelper.decodeToken(res.login_token);
				localStorage.setItem('user_data', JSON.stringify({
					userId: decodedToken.sub,
					userType: decodedToken.type
				}));

				this.isLoggedIn.next(true);
			}

			return res;
		}));
	}

	register(name, email, password, userType) {
		return this.http.post(
			this.registerUrl,
			JSON.stringify({ name: name, email: email, password: password, userType: userType }), {
			headers: contentHeaders
		});
	}

	resendInvitation(email){
		return this.http.post(
			this.registerUrl,
			JSON.stringify({ email: email }), {
			headers: contentHeaders
		});
	}
	
	validateEmail(token) {
		return this.http.post(
			this.validateEmailUrl,
			JSON.stringify({ account_key: token }), {
			headers: contentHeaders
		});
	}

	logout() {
		localStorage.removeItem('id_token');
		this.isLoggedIn.next(false);
		this.router.navigate(['/login']);
	}

	getUserData(): any {
		const userDataString = localStorage.getItem('user_data');
		const userData = JSON.parse(userDataString);
		return userData;
	}

	checkIfTokenIsNotExpired() {
		const jwtToken = localStorage.getItem('id_token');

		if (jwtToken && !this.jwtHelper.isTokenExpired(jwtToken)) {
			this.isLoggedIn.next(true);
			return true;
		}

		this.isLoggedIn.next(false);

		return false;
	}
}
