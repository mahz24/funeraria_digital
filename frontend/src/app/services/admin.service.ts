import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  list(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${environment.url_ms_business}/admins`);
  }

  view(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${environment.url_ms_business}/admins/${id}`);
  }
  create(theAdmin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${environment.url_ms_business}/admins`, theAdmin
    );
  }
  update(theAdmin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${environment.url_ms_business}/admins/${theAdmin.id}`, theAdmin);
  }
  delete(id: number) {
    return this.http.delete<Admin>(`${environment.url_ms_business}/admins/${id}`,
    );
  }

}
