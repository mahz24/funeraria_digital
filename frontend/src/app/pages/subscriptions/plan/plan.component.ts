import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/model/plan.model';
import { Subscription } from 'src/app/model/subscription.model';
import { ClientService } from 'src/app/services/client.service';
import { PlanService } from 'src/app/services/plan.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  id:number
  plans: Plan[];
  sub: Subscription
  constructor(
    private service: PlanService, 
    private router: Router, 
    private activateRoute: ActivatedRoute,
    private clientService: ClientService,
    private subService: SubscriptionService
  ) {
    this.plans = []
    this.sub={
      activation_date: null,
      plan:{id:0, name:"", description:"", price:0, beneficiaries_number:0},
      client:{id:0}
    }
  }

  ngOnInit(): void {
    this.sub.client.id = this.activateRoute.snapshot.params.id
    this.clientService.view(this.sub.client.id).subscribe(data =>{
      this.sub.client = data
      this.sub.client.user.password = ""
    })
    this.list()
  }

  list() {
    this.service.listPlan(this.sub.client.id).subscribe(data => {
      this.plans = data
    })
  }

  view(id:number){
    this.router.navigate(["planservices/list/sub/"+id])
  }

  create(id: number): void {
    this.service.view(id).subscribe(data =>{
      this.sub.plan = data
    })
    this.sub.activation_date = new Date()
    Swal.fire({
      title: 'Suscripción',
      text: "Está seguro que quiere suscbirte al registro?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, suscribirme',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subService.create(this.sub).subscribe(data => {
          Swal.fire(
            'Suscrito!',
            'Te has suscrito correctamente al plan',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }

  services(id: number){
    this.router.navigate(["planservices/list/plan/"+id])
  }
  
  clients(id: number){
    this.router.navigate(["subscriptions/list/plan/"+id])
  }
}
