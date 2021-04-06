import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../shared/headers'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = "/api/auth/login";
  private registerUrl = "/api/auth/register";
  private validateEmailUrl = '/api/auth/validateEmail';

  constructor(private http: HttpClient) { }

  login(email, password) {
    return this.http.post(
      this.loginUrl,
      JSON.stringify({ email: email, password: password }), {
      headers: contentHeaders
    }
    );
  }

  register(name, email, password, userType) {
    return this.http.post(
      this.registerUrl,
      JSON.stringify({ name: name, email: email, password: password, userType: userType }), {
      headers: contentHeaders
    }
    );
  }

  validateEmail(token) {
    return this.http.post(
      this.validateEmailUrl,
      JSON.stringify({ account_key: token }), {
      headers: contentHeaders
    });
  }
}
