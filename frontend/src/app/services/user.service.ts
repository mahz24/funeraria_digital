import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { Profile } from '../model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  
  list(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_ms_security}/users`);
  }

  findByEmail(user: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/users/email`, user);
  }

  view(id: String): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_security}/users/${id}`);
  }

  getProfile(id:String): Observable<Profile> {
    return this.http.get<Profile>(`${environment.url_ms_security}/profiles/${id}`);
  }
  
  createProfile(id:String, theProfile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${environment.url_ms_security}/profiles/user/${id}`, theProfile);
  }


  updateProfile(id:String, theProfile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${environment.url_ms_security}/profiles/user/${id}`, theProfile);
  }
  
  deleteProfile(id: String) {
    return this.http.delete<Profile>(`${environment.url_ms_security}/profiles/${id}`);
  }

  create(theUser: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/users`, theUser)
  }

  matchRole(id:string): Observable<User> {
    return this.http.put<User>(`${environment.url_ms_security}/users/${id}/role/6614af78dc70ec7408facfd1`,id);
  }

  update(theUser: User): Observable<User> {
    return this.http.put<User>(`${environment.url_ms_security}/users/${theUser._id}`, theUser);
  }
  delete(id: String) {
    return this.http.delete<User>(`${environment.url_ms_security}/users/${id}`);
  }
}
