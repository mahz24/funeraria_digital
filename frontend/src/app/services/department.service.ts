import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }


  list(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.url_ms_business}/departments`);
  }

  view(id: number): Observable<Department> {
    return this.http.get<Department>(`${environment.url_ms_business}/departments/${id},
    `);
  }
  create(theDepartment: Department): Observable<Department> {
    return this.http.post<Department>(`${environment.url_ms_business}/departments/`, theDepartment
    );
  }
  update(theDepartment: Department): Observable<Department> {
    return this.http.put<Department>(`${environment.url_ms_business}/departments/${theDepartment.id}`, theDepartment);
  }
  delete(id: number) {
    return this.http.delete<Department>(`${environment.url_ms_business}/departments/${id}`,
    );
  }
}
