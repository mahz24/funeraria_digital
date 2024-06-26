import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../model/service.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  list(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.url_ms_business}/services`);
  }

  listServices(id:number): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.url_ms_business}/services/plan/${id}`);
  }

  view(id: number): Observable<Service> {
    return this.http.get<Service>(`${environment.url_ms_business}/services/${id},
    `);
  }
  create(theService: Service): Observable<Service> {
    return this.http.post<Service>(`${environment.url_ms_business}/services/`, theService
    );
  }
  update(theService: Service): Observable<Service> {
    return this.http.put<Service>(`${environment.url_ms_business}/services/${theService.id}`, theService);
  }
  delete(id: number) {
    return this.http.delete<Service>(`${environment.url_ms_business}/services/${id}`,
    );
  }
}
