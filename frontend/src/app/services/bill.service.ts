import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../model/bill.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  list(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${environment.url_ms_business}/bills`);
  }
  listBills(id: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${environment.url_ms_business}/bills/subscription/${id}`);
  }

  view(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${environment.url_ms_business}/bills/${id}
    `);
  }
  create(theBill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${environment.url_ms_business}/bills/`, theBill
    );
  }
  update(theBill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${environment.url_ms_business}/bills/${theBill.id}`, theBill);
  }
  delete(id: number) {
    return this.http.delete<Bill>(`${environment.url_ms_business}/bills/${id}`,
    );
  }

}
