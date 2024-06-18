import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { Session } from '../model/session.model';
import { UserService } from './user.service';
import { Profile } from '../model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  theUser = new BehaviorSubject<User>(new User);
  constructor(private http: HttpClient, private service: UserService) {
    this.verifyActualSession()
   }
  /**
    * Permite obtener la información de usuario
    * que tiene la función activa y servirá
    * para acceder a la información del token
*/
  public get activeUserSession(): User {
    return this.theUser.value;
  }
  /**
    * Permite actualizar la información del usuario
    * que acabó de validarse correctamente
    * @param user información del usuario logueado
  */
  setUser(user: User) {
    this.theUser.next(user);
  }
  /**
  * Permite obtener la información del usuario
  * con datos tales como el identificador y el token
  * @returns
  */
  getUser() {
    return this.theUser.asObservable();
  }
  /**
  * Realiza la petición al backend con el correo y la contraseña
  * para verificar si existe o no en la plataforma
  * @param infoUsuario JSON con la información de correo y contraseña
  * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
  */
  login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/api/public/security/login`, user);
  }
  /*
  OJO FALTA VALIDACIÓN
  */

  authentication2fa(id: String, session: Session): Observable<Session> {
    return this.http.post<Session>(`${environment.url_ms_security}/api/public/security/2FA-login/${id}`, session);
  }

  resetPassword(email: string): Observable<Session> {
    return this.http.patch<Session>(`${environment.url_ms_security}/api/public/security/reset-password`, { "email": email });
  }
  /*
  OJO FALTA VALIDACIÓN
  */
  saveSession(dataSesion: any) {
    
    let profile: String
    let dataa: User
    this.service.getProfile(dataSesion["User"]["_id"]).subscribe(data => {
    console.log(data);
      
      
     dataa = {
      _id: dataSesion["User"]["_id"],
      password: "",
      name:data.name,
      email: dataSesion["User"]["email"],
      role: dataSesion["User"]["role"],
      token: dataSesion["token"]
    }
    localStorage.setItem('sesion', JSON.stringify(dataa));
    this.setUser(dataa);
    let actualSession = localStorage.getItem('sesion');
    });
    
   
  }
  /**
  * Permite cerrar la sesión del usuario
  * que estaba previamente logueado
  */
  logout() {
    localStorage.removeItem('sesion');
    this.setUser(new User());
  }
  /**
  * Permite verificar si actualmente en el local storage
  * existe información de un usuario previamente logueado
  */
  verifyActualSession() {
    let actualSesion = this.getSessionData();
    if (actualSesion) {
      this.setUser(JSON.parse(actualSesion));
    }
  }
  /**
  * Verifica si hay una sesion activa
  * @returns
  */
  existSession(): boolean {
    let sesionActual = this.getSessionData();
    return (sesionActual) ? true : false;
  }
  /**
  * Permite obtener los dato de la sesión activa en el
  * local storage
  * @returns
  */
  getSessionData() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }

}