import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holder } from '../model/holder.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolderService {

  constructor(private http:HttpClient) { }
  list(): Observable<Holder[]> {
    return this.http.get<Holder[]>(`${environment.url_ms_business}/holders`);
  }

  view(id: number): Observable<Holder> {
    return this.http.get<Holder>(`${environment.url_ms_business}/holders/${id}`);
  }
  create(theHolder: Holder): Observable<Holder> {
    return this.http.post<Holder>(`${environment.url_ms_business}/holders`, theHolder
    );
  }
  update(theHolder: Holder): Observable<Holder> {
    return this.http.put<Holder>(`${environment.url_ms_business}/holders/${theHolder.id}`, theHolder);
  }
  delete(id: number) {
    return this.http.delete<Holder>(`${environment.url_ms_business}/holders/${id}`,
    );
  }
  listNon():Observable<Holder[]> {
    return this.http.get<Holder[]>(`${environment.url_ms_business}/holders/non`);
  }
}
