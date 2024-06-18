import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Burial } from '../model/burial';

@Injectable({
  providedIn: 'root'
})
export class BurialService {
  constructor(private http: HttpClient) { }


  list(): Observable<Burial[]> {
    return this.http.get<Burial[]>(`${environment.url_ms_business}/burials`);
  }

  view(id: number): Observable<Burial> {
    return this.http.get<Burial>(`${environment.url_ms_business}/burials/${id}
    `);
  }
  create(theBurial: Burial): Observable<Burial> {
    return this.http.post<Burial>(`${environment.url_ms_business}/burials/`, theBurial
    );
  }
  update(theBurial: Burial): Observable<Burial> {
    return this.http.put<Burial>(`${environment.url_ms_business}/burials/${theBurial.id}`, theBurial);
  }
  delete(id: number) {
    return this.http.delete<Burial>(`${environment.url_ms_business}/burials/${id}`,
    );
  }
}
