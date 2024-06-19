import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Benefactor } from '../model/benefactor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BenefactorService {

  constructor(private http: HttpClient) { }

  list(): Observable<Benefactor[]> {
    return this.http.get<Benefactor[]>(`${environment.url_ms_business}/benefactors`);
  }

  listBenefactors(id: number): Observable<Benefactor[]> {
    return this.http.get<Benefactor[]>(`${environment.url_ms_business}/benefactors/holder/${id}`);
  }

  view(id: number): Observable<Benefactor> {
    return this.http.get<Benefactor>(`${environment.url_ms_business}/benefactors/${id}`);
  }
  create(theBenefactor: Benefactor): Observable<Benefactor> {
    return this.http.post<Benefactor>(`${environment.url_ms_business}/benefactors`, theBenefactor
    );
  }
  update(theBenefactor: Benefactor): Observable<Benefactor> {
    return this.http.put<Benefactor>(`${environment.url_ms_business}/benefactors/${theBenefactor.id}`, theBenefactor);
  }
  delete(id: number) {
    return this.http.delete<Benefactor>(`${environment.url_ms_business}/benefactors/${id}`,
    );
  }
}
