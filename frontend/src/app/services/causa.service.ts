import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Causa } from '../model/causa.model';

@Injectable({
  providedIn: 'root'
})
export class CausaService {
  constructor(private http: HttpClient) { }

  list(): Observable<Causa[]> {
    return this.http.get<Causa[]>(`${environment.url_difuntos}/causa-fallecimiento`);
  }

  create(theCausa: Causa): Observable<Causa> {
    return this.http.post<Causa>(`${environment.url_difuntos}/causa-fallecimiento/`, theCausa
    );
  }
}
