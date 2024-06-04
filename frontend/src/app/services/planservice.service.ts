import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planservice } from '../model/planservice';

@Injectable({
  providedIn: 'root'
})
export class PlanserviceService {

   
  constructor(private http:HttpClient) { }

  
  list(): Observable<Planservice[]> {
    return this.http.get<Planservice[]>(`${environment.url_ms_business}/planservices`);
  }

  view(id: number): Observable<Planservice> {
    return this.http.get<Planservice>(`${environment.url_ms_business}/planservices/${id},
    `);
  }
  create(thePlanservice: Planservice): Observable<Planservice> {
    return this.http.post<Planservice>(`${environment.url_ms_business}/planservices/`, thePlanservice
    );
  }
  update(thePlanservice: Planservice): Observable<Planservice> {
    return this.http.put<Planservice>(`${environment.url_ms_business}/planservices/${thePlanservice.id}`, thePlanservice);
  }
  delete(id: number) {
    return this.http.delete<Planservice>(`${environment.url_ms_business}/planservices/${id}`,
    );
  }
}