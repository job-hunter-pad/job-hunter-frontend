import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = "/api/auth/login";
  private registerUrl = "/api/auth/register";
  private validateEmailUrl = 'api/auth/validateEmail';

  constructor(private http: HttpClient) { }

  login(email, password) {
    return this.http.post(
      this.loginUrl,
      JSON.stringify({email: email, password: password})
    );
  }

  register(name, email, password, userType) {
    return this.http.post(
      this.registerUrl, 
      JSON.stringify({name: name, email: email, password: password, userType: userType})
    );
  }

  validateEmail(token) {
    return this.http.post(
      this.validateEmailUrl,
      JSON.stringify({login_token: token})
    );
  }
}
