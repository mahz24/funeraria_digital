import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../model/chat';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }


  list(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.url_ms_business}/chats`);
  }

  view(id: number): Observable<Chat> {
    return this.http.get<Chat>(`${environment.url_ms_business}/chats/${id},
    `);
  }
  create(theChat: Chat): Observable<Chat> {
    return this.http.post<Chat>(`${environment.url_ms_business}/chats/`, theChat
    );
  }
  update(theChat: Chat): Observable<Chat> {
    return this.http.put<Chat>(`${environment.url_ms_business}/chats/${theChat.id}`, theChat);
  }
  delete(id: number) {
    return this.http.delete<Chat>(`${environment.url_ms_business}/chats/${id}`,
    );
  }

}
