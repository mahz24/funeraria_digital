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

  view(id: String): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_security}/users/${id}`);
  }

  getProfile(id:String): Observable<Profile> {
    return this.http.get<Profile>(`${environment.url_ms_security}/profiles/${id}`);
  } 

  create(theUser: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/users/`, theUser);
  }
  update(theUser: User): Observable<User> {
    return this.http.put<User>(`${environment.url_ms_security}/users/${theUser._id}`, theUser);
  }
  delete(id: String) {
    return this.http.delete<User>(`${environment.url_ms_security}/users/${id}`);
  }
}
