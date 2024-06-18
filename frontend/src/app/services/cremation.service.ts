import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cremation } from '../model/cremation';

@Injectable({
  providedIn: 'root'
})
export class CremationService {
  constructor(private http: HttpClient) { }


  list(): Observable<Cremation[]> {
    return this.http.get<Cremation[]>(`${environment.url_ms_business}/cremations`);
  }

  view(id: number): Observable<Cremation> {
    return this.http.get<Cremation>(`${environment.url_ms_business}/cremations/${id},
    `);
  }
  create(theCremation: Cremation): Observable<Cremation> {
    return this.http.post<Cremation>(`${environment.url_ms_business}/cremations`, theCremation
    );
  }
  update(theCremation: Cremation): Observable<Cremation> {
    return this.http.put<Cremation>(`${environment.url_ms_business}/cremations/${theCremation.id}`, theCremation);
  }
  delete(id: number) {
    return this.http.delete<Cremation>(`${environment.url_ms_business}/cremations/${id}`,
    );
  }
}
