import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Headquarter } from '../model/headquarter';

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {
  constructor(private http: HttpClient) { }

  list(): Observable<Headquarter[]> {
    return this.http.get<Headquarter[]>(`${environment.url_ms_business}/headquarters`);
  }

  view(id: number): Observable<Headquarter> {
    return this.http.get<Headquarter>(`${environment.url_ms_business}/headquarters/${id},
    `);
  }
  create(theHeadquarter: Headquarter): Observable<Headquarter> {
    return this.http.post<Headquarter>(`${environment.url_ms_business}/headquarters/`, theHeadquarter
    );
  }
  update(theHeadquarter: Headquarter): Observable<Headquarter> {
    return this.http.put<Headquarter>(`${environment.url_ms_business}/headquarters/${theHeadquarter.id}`, theHeadquarter);
  }
  delete(id: number) {
    return this.http.delete<Headquarter>(`${environment.url_ms_business}/headquarters/${id}`,
    );
  }
}
