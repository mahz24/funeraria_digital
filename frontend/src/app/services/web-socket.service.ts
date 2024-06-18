import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {
  callback: EventEmitter<any> = new EventEmitter()
  nameEvent: string;

  constructor() {
    super({
      url: environment.url_ms_business,
      options: {

      }
    })
    this.nameEvent = ""
    this.listen()
  }

  setNameEvent(nameEvent: string) {
    if (this.nameEvent) {
      this.ioSocket.off(this.nameEvent);  // Dejar de escuchar el evento anterior
    }
    this.nameEvent = nameEvent;
    this.listen();
  }
  
  listen = () => {
    this.ioSocket.on(this.nameEvent, (res: any) => this.callback.emit(res))
  }
}
