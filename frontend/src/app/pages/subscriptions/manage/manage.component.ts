import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Plan } from 'src/app/model/plan.model';
import { Subscription } from 'src/app/model/subscription.model';
import { ClientService } from 'src/app/services/client.service';
import { PlanService } from 'src/app/services/plan.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  sub: Subscription
  theFormGroup: FormGroup;
  trySend: boolean
  clients: Client[]
  plans: Plan[]
  constructor(private activateRoute: ActivatedRoute,
              private subService: SubscriptionService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private clientService: ClientService,
              private planService: PlanService,
  ){
    this.mode=1
    this.trySend=false
    this.sub={
      id: 0,
      activation_date: null,
      client:{
        id:0,
        user_id:"",
        direction: "",
        gender: "",
        is_alive: null,
        user:{
          email: "",
          password: ""
        }
      },
      plan:{
        id: 0,
        name:"", 
        description:"", 
        price:0, 
        beneficiaries_number:0
      }
    }
    this.configFormGroup()
  }
  getSub(id:number){
      this.subService.view(id).subscribe(data =>{
        this.sub = data
        this.theFormGroup.patchValue({
          activation_date: this.sub.activation_date,
          idClient: this.sub.client.id,
          idPlan: this.sub.plan.id
        })
      })
    }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      activation_date:['',Validators.required],
      idClient:[null, Validators.required],
      idPlan:[null, Validators.required]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  clientList(){
    this.clientService.list().subscribe(data=>{
      this.clients = data
    })
  }

  planList(){
    this.planService.list().subscribe(data =>{
      this.plans = data
    })
  }

  ngOnInit(): void{
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id){
      this.sub.id=this.activateRoute.snapshot.params.id
      this.getSub(this.sub.id)
    }
    this.clientList()
    this.planList()
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.subService.create(this.sub).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["subscriptions/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.subService.update(this.sub).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["subscriptions/list"])
      })
    }
  }

  btnClient(){
    this.router.navigate(["clients/view/"+this.sub.client.id])
  }

  btnPlan(){
    this.router.navigate(["plans/view/"+this.sub.plan.id])
  }
}
