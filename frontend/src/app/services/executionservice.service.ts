import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Executionservice } from '../model/executionservice';

@Injectable({
  providedIn: 'root'
})
export class ExecutionserviceService {

  
  constructor(private http:HttpClient) { }

  
  list(): Observable<Executionservice[]> {
    return this.http.get<Executionservice[]>(`${environment.url_ms_business}/executionservice`);
  }

  listServices(id: number): Observable<Executionservice[]> {
    return this.http.get<Executionservice[]>(`${environment.url_ms_business}/executionservice/client/${id}`);
  }

  listClients(id: number): Observable<Executionservice[]> {
    return this.http.get<Executionservice[]>(`${environment.url_ms_business}/executionservice/service/${id}`);
  }

  view(id: number): Observable<Executionservice> {
    return this.http.get<Executionservice>(`${environment.url_ms_business}/executionservice/${id},
    `);
  }
  create(theExecutionService: Executionservice): Observable<Executionservice> {
    return this.http.post<Executionservice>(`${environment.url_ms_business}/executionservice/`, theExecutionService
    );
  }
  update(theExecutionService: Executionservice): Observable<Executionservice> {
    return this.http.put<Executionservice>(`${environment.url_ms_business}/executionservice/${theExecutionService.id}`, theExecutionService);
  }
  delete(id: number) {
    return this.http.delete<Executionservice>(`${environment.url_ms_business}/executionservice/${id}`,
    );
  }
}
