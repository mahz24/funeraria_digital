import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Relocation } from '../model/relocation';

@Injectable({
  providedIn: 'root'
})
export class RelocationService {
  constructor(private http: HttpClient) { }


  list(): Observable<Relocation[]> {
    return this.http.get<Relocation[]>(`${environment.url_ms_business}/relocations`);
  }

  view(id: number): Observable<Relocation> {
    return this.http.get<Relocation>(`${environment.url_ms_business}/relocations/${id},
    `);
  }
  create(theRelocation: Relocation): Observable<Relocation> {
    return this.http.post<Relocation>(`${environment.url_ms_business}/relocations/`, theRelocation
    );
  }
  update(theRelocation: Relocation): Observable<Relocation> {
    return this.http.put<Relocation>(`${environment.url_ms_business}/relocations/${theRelocation.id}`, theRelocation);
  }
  delete(id: number) {
    return this.http.delete<Relocation>(`${environment.url_ms_business}/relocations/${id}`,
    );
  }
}
