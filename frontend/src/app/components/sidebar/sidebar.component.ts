import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export let ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '1' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '1' },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '0' },
  { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '0' },
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
  id:number
  public menuItems: any[];
  public isCollapsed = true;
  public notification: boolean


  constructor(private router: Router,
    private theSecutityService: SecurityService,
    private theWebSocketService: WebSocketService) { }

  ngOnInit() {
    this.notification = false
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
}

