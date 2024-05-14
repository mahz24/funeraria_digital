import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private http: HttpClient) { }


  list(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.url_ms_business}/cities`);
  }

  view(id: number): Observable<City> {
    return this.http.get<City>(`${environment.url_ms_business}/cities/${id},
    `);
  }
  create(theCity: City): Observable<City> {
    return this.http.post<City>(`${environment.url_ms_business}/cities/`, theCity
    );
  }
  update(theCity: City): Observable<City> {
    return this.http.put<City>(`${environment.url_ms_business}/cities/${theCity.id}`, theCity);
  }
  delete(id: number) {
    return this.http.delete<City>(`${environment.url_ms_business}/cities/${id}`,
    );
  }

}
