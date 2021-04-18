import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EmployerProfile } from './employer-profile/employer-profile';
import { contentHeaders } from '../shared/headers'

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private profileUrl = '/api/auth/profile/'

  constructor(private http: HttpClient) { }

  getEmployerProfileById(id) {

    return this.http.get(
      this.profileUrl + id,
      {
        headers: contentHeaders
      }
    ).pipe(map((jsonProfile: any) => {
      return jsonProfile
    }));
  }
}
