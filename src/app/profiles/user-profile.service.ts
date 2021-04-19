import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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

  updateEmployerProfile(id, name, description, location, phoneNumber) {
    return this.http.post(
      this.profileUrl + id + "/update",
      JSON.stringify({ name: name, description: description, location: location, phoneNumber: phoneNumber }), {
      headers: contentHeaders
    });
  }

  getProfilePhoto(id) {
    return this.http.get(this.profileUrl + id + "/getPhoto", {
      responseType: 'blob',
    });
  }

  updateProfilePhoto(id, photo) {
    const formData = new FormData();
    formData.append("profilePhoto", photo);
    return this.http.post(this.profileUrl + id + "/updatePhoto", formData);
  }

}
