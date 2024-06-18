import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Suste } from '../model/suste';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SusteService {

  constructor(private http: HttpClient) { }

  list(): Observable<Suste[]> {
    return this.http.get<Suste[]>(`${environment.url_sustentacion}/todos`);
  }

  view(id: number): Observable<Suste> {
    return this.http.get<Suste>(`${environment.url_sustentacion}/todos/${id},
    `);
  }
  create(theSuste: Suste): Observable<Suste> {
    return this.http.post<Suste>(`${environment.url_sustentacion}/services/`, theSuste
    );
  }
}
