import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
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
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '2' },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '2' },
  { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '2' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '1' },
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '2' },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '0' },
  { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '0' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  theUser: User;
  subscription: Subscription

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,
    private theSecutityService: SecurityService,
    private theWebSocket: WebSocketService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.subscription = this.theSecutityService.getUser().subscribe(data => {
      this.theUser = data
    })
    this.theWebSocket.setNameEvent('news')
    this.theWebSocket.callback.subscribe(data => {
      console.log("Llegando desde el backend" + JSON.stringify(data));
      //hacer el resto de logica

    })
  }

  getTheSecurityService() {
    return this.getTheSecurityService
  }
}
