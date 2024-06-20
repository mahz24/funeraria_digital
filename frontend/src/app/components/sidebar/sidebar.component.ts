import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/model/client';
import { User } from 'src/app/model/user.model';
import { ClientService } from 'src/app/services/client.service';
import { SecurityService } from 'src/app/services/security.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { cli } from 'webpack';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export let ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '3' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '1' },
  { path: `/plans/list`, title: 'Planes', icon: 'ni-planet text-blue', class: '2' },
  { path: `/services/list`, title: 'Servicios', icon: 'ni-planet text-blue', class: '2' },
  { path: `/rooms/list`, title: 'Salas', icon: 'ni-planet text-blue', class: '2' },
  { path: `/headquarters/list`, title: 'Sucursales', icon: 'ni-planet text-blue', class: '2' },
  { path: `/cities/list`, title: 'Ciudades', icon: 'ni-planet text-blue', class: '2' },
  { path: `/departments/list`, title: 'Departamentos', icon: 'ni-planet text-blue', class: '2' },
  { path: `/chats/list`, title: 'Chats', icon: 'ni-planet text-blue', class: '2' },
  { path: `/messages/list`, title: 'Mensajes', icon: 'ni-planet text-blue', class: '2' },
  { path: `/comments/list`, title: 'Comentarios', icon: 'ni-planet text-blue', class: '2' },
  { path: `/benefactors/list`, title: 'Beneficiarios', icon: 'ni-planet text-blue', class: '2' },
  { path: `/holders/list`, title: 'Titulares', icon: 'ni-planet text-blue', class: '2' },
  { path: `/messages/list`, title: 'Mensajes', icon: 'ni-planet text-blue', class: '2' },
  { path: `/clients/list`, title: 'Clientes', icon: 'ni-planet text-blue', class: '2' },
  { path: `/executionservices/list`, title: 'Solicitud servicios', icon: 'ni-planet text-blue', class: '2' },
  { path: `/subscriptions/list`, title: 'Suscripciones', icon: 'ni-planet text-blue', class: '2' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  theUser: User;
  subscription: Subscription
  chat: number
  id: number
  client:any
  iduser:string
  public menuItems: any[];
  public isCollapsed = true;
  public notification: boolean
  public admin: boolean

  constructor(private router: Router,
    private theSecutityService: SecurityService,
    private theWebSocketService: WebSocketService,
    private theClientService: ClientService) { }

  ngOnInit() {
    this.getClient()
    this.notification = false
    this.admin=false
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.subscription = this.theSecutityService.getUser().subscribe(data => {
      this.theUser = data
    })
    this.theWebSocketService.setNameEvent("news")
    this.theWebSocketService.callback.subscribe(data => {
      console.log("llegando desde el backend" + JSON.stringify(data))
      if (data) {
        this.notification = true
        this.chat = data.chat
        console.log("chat " + this.chat);
      }
    })
  }

  notificacion() {
    this.router.navigate([`chats/chat/${this.chat}`])
  }

  getTheSecurityService() {
    return this.theSecutityService
  }

  getClient() {
    let sesion= JSON.parse(this.theSecutityService.getSessionData())
    this.iduser = sesion._id
    this.theClientService.search(this.iduser).subscribe(data =>{
      this.client = data
      this.id=this.client.id
      })
    if (sesion.role.name=="ADMINISTRADOR") {
      this.admin=true
    }
  }

  suscripciones(){
    this.router.navigate([`subscriptions/list/client/${this.id}`])
  }

  servicios(){
    this.router.navigate([`executionservices/list/client/${this.id}`])
  }

  login(){
    this.router.navigate([`login`])
  }

  register(){
    this.router.navigate([`register`])
  }
}

