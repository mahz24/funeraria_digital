import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  
  list(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.url_ms_business}/clients`);
  }

  view(id: number): Observable<Client> {
    return this.http.get<Client>(`${environment.url_ms_business}/clients/${id},
    `);
  }
  create(theClient: Client): Observable<Client> {
    return this.http.post<Client>(`${environment.url_ms_business}/clients/`, theClient
    );
  }
  update(theClient: Client): Observable<Client> {
    return this.http.put<Client>(`${environment.url_ms_business}/clients/${theClient.id}`, theClient);
  }
  delete(id: number) {
    return this.http.delete<Client>(`${environment.url_ms_business}/clients/${id}`,
    );
  }
}
