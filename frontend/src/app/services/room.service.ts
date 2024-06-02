import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) { }

  list(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.url_ms_business}/rooms`);
  }

  view(id: number): Observable<Room> {
    return this.http.get<Room>(`${environment.url_ms_business}/rooms/${id},
    `);
  }
  create(theRoom: Room): Observable<Room> {
    return this.http.post<Room>(`${environment.url_ms_business}/rooms/`, theRoom
    );
  }
  update(theRoom: Room): Observable<Room> {
    return this.http.put<Room>(`${environment.url_ms_business}/rooms/${theRoom.num}`, theRoom);
  }
  delete(id: number) {
    return this.http.delete<Room>(`${environment.url_ms_business}/rooms/${id}`,
    );
  }
}
