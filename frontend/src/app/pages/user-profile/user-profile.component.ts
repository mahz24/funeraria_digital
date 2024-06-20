import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Profile } from 'src/app/model/profile.model';
import { User } from 'src/app/model/user.model';
import { ClientService } from 'src/app/services/client.service';
import { SecurityService } from 'src/app/services/security.service';
import { UserService } from 'src/app/services/user.service';
import { cli } from 'webpack';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  client: Client;
  profile: Profile
  user: User
  constructor(private serviceClient:ClientService,
              private userService: UserService,
              private router: Router,
              private securityService: SecurityService
  ){
    this.client = {id: 0, direction:"", gender:"", is_alive: true}
    this.profile = {name: "", last_name: "", birthday: "", number_phone:""}
    this.user = {email: "", password: ""}
  }
  getClient(){
      this.user= this.securityService.activeUserSession
      this.serviceClient.search(this.user._id).subscribe(data =>{
        this.client = data
        this.userService.getProfile(this.user._id).subscribe(data => {
          this.profile = data
          console.log(this.client);
          console.log(this.profile);
          console.log(this.user);
        })
      })
    }

  ngOnInit(): void{
    this.getClient()
  }

  editar(){
console.log("dentro");

    this.router.navigate(["clients/update/"+this.client.id])
  }
}
