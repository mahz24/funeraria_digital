import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Benefactor } from 'src/app/model/benefactor.model';
import { Client } from 'src/app/model/client';
import { User } from 'src/app/model/user.model';
import { BenefactorService } from 'src/app/services/benefactor.service';
import { ClientService } from 'src/app/services/client.service';
import { HolderService } from 'src/app/services/holder.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.scss']
})
export class PetitionComponent implements OnInit {
  theUser: User
  theClient: Client
  deadClient: Client
  constructor(private userService: UserService, 
              private clientService: ClientService, 
              private router: Router,
              private holderService: HolderService,
              private benefactorService: BenefactorService
            ) {
    this.theUser = {
      email: "", password: ""
    }
    this.theClient={
      id:0, holder:{id:null}, 
      benefactor:{
        id:null,
        isprincipal_benefactor: null, 
        isemergency_contact: null, 
        client_id:null,
        holder_id: null
      }
    }
    this.deadClient = {
      id:0, holder:{id:null}, 
      benefactor:{
        id:null,
        isprincipal_benefactor: null, 
        isemergency_contact: null, 
        client_id:null,
        holder_id: null
      }
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  petition() {
    this.userService.findByEmail(this.theUser).subscribe(data =>{
      this.theUser = data
      if(this.theUser == null){
        Swal.fire("Autorización Invalida", "Correo no inscrito", "error")
      }else{
        this.clientService.search(this.theUser._id).subscribe(data =>{
          this.theClient = data
          if(this.theClient.benefactor){
            this.clientService.view(this.theClient.benefactor.client_id).subscribe(data =>{
              this.deadClient = data
              this.deadClient.is_alive = false
              this.clientService.update(this.deadClient).subscribe()
              Swal.fire("Sentimos mucha pena por la persona", "Aquí tienes los planes disponibles.", "info")
              this.router.navigate(['subscriptions/list/client/'+ this.theClient.benefactor.holder.client_id])
            })
          }else if(this.theClient.holder){
            this.holderService.principal(this.theClient.holder.id).subscribe(data =>{
              let benefactorP: Benefactor = data
              this.clientService.view(benefactorP.client_id).subscribe(data =>{
                benefactorP.client = data
                this.theClient.holder.client_id = benefactorP.client_id
                this.theClient.holder.client= benefactorP.client
                this.theClient.is_alive = false
                this.clientService.update(this.theClient).subscribe()
                this.holderService.update(this.theClient.holder).subscribe()
                this.benefactorService.delete(benefactorP.id).subscribe()
                Swal.fire("Sentimos mucha pena por la persona", "Aquí tienes los planes disponibles.", "info")
                this.router.navigate(['subscriptions/list/client/'+ this.theClient.id])
              })
            })
          }
        })
      }
      
    })
  }
}
