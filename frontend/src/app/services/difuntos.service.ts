import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Difunto } from '../model/difunto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DifuntosService {
  constructor(private http: HttpClient) { }


  list(): Observable<Difunto[]> {
    return this.http.get<Difunto[]>(`${environment.url_difuntos}/difuntos`);
  }

  create(theDifunto: Difunto): Observable<Difunto> {
    return this.http.post<Difunto>(`${environment.url_difuntos}/difuntos/`, theDifunto
    );
  }
}
