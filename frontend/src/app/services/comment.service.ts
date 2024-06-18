import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  constructor(private http:HttpClient) { }

  
  list(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url_ms_business}/comments`);
  }

  listComments(id:number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url_ms_business}/comments/execution/${id}`);
  }

  view(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${environment.url_ms_business}/comments/${id},
    `);
  }
  create(theComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${environment.url_ms_business}/comments/`, theComment
    );
  }
  update(theComment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${environment.url_ms_business}/comments/${theComment.id}`, theComment);
  }
  delete(id: number) {
    return this.http.delete<Comment>(`${environment.url_ms_business}/comments/${id}`,
    );
  }
}
