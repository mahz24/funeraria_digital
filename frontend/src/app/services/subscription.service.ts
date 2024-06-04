import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../model/subscription.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  list(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${environment.url_ms_business}/subscriptions`);
  }

  view(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${environment.url_ms_business}/subscriptions/${id},
    `);
  }
  create(theSubscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(`${environment.url_ms_business}/subscriptions/`, theSubscription
    );
  }
  update(theSubscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${environment.url_ms_business}/subscriptions/${theSubscription.id}`, theSubscription);
  }
  delete(id: number) {
    return this.http.delete<Subscription>(`${environment.url_ms_business}/subscriptions/${id}`,
    );
  }
}
