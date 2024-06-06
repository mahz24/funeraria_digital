import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/model/plan.model';
import { Planservice } from 'src/app/model/planservice';
import { Service } from 'src/app/model/service.model';
import { PlanService } from 'src/app/services/plan.service';
import { PlanserviceService } from 'src/app/services/planservice.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
}) export class ManageComponent implements OnInit {
  mode: number
  thePlan: Planservice
  theFormGroup: FormGroup
  trySend: boolean
  plans:Plan[]
  services:Service[]
  constructor(private activateRoute: ActivatedRoute,
    private service: PlanserviceService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private elservicioServicios:ServiceService,
    private planservice:PlanService
  ) {
    this.mode = 1;
    this.trySend = false
    this.plans=[]
    this.services=[]
    this.thePlan = {
      id: 0,
      plan_id: 0,
      service_id: 0,
      service:{
        id:0,
        description:"",
        price: 0,
        status: ""
      },
      plan:{
        id:0,
        name:"",
        description:"",
        price:0,
        beneficiaries_number:0
      },
    }

  }


  ngOnInit(): void {

    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.thePlan.id = this.activateRoute.snapshot.params.id
      this.getPS(this.thePlan.id)
    }
    this.configFromGroup()
    this.servicesList()
    this.plansList()
  }

  configFromGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0, [Validators.required]],
      service_id: [0, [Validators.required]],
      plan_id: [0, [Validators.required]]
    })
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getPS(id: number) {
    this.service.view(id).subscribe(data => {
      this.thePlan = data
    })
  }

  servicesList(){
    this.elservicioServicios.list().subscribe(data=>{
      this.services = data
    })
  }

  plansList(){
    this.planservice.list().subscribe(data=>{
      this.plans = data
    })
  }


  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      console.log(this.thePlan);
      
      this.service.create(this.thePlan).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["planservices/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.service.update(this.thePlan).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["palnservices/list"])
      })
    }
  }


}