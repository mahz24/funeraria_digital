import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  
  list(): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.url_ms_business}/messages`);
  }

  listByChat(id:number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.url_ms_business}/messages/bychat/${id}`);
  }

  view(id: number): Observable<Message> {
    return this.http.get<Message>(`${environment.url_ms_business}/messages/${id},
    `);
  }
  create(theMessage: Message): Observable<Message> {
    return this.http.post<Message>(`${environment.url_ms_business}/messages/`, theMessage
    );
  }
  update(theMessage: Message): Observable<Message> {
    return this.http.put<Message>(`${environment.url_ms_business}/messages/${theMessage.id}`, theMessage);
  }
  delete(id: number) {
    return this.http.delete<Message>(`${environment.url_ms_business}/messages/${id}`,
    );
  }
}
