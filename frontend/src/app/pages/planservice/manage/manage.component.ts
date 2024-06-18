import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  thePlan: Planservice
  services:Service[]
  constructor(private activateRoute: ActivatedRoute,
    private service: PlanserviceService,
    private router: Router,
    private elservicioServicios:ServiceService,
    private planService: PlanService
  ) {
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
    if (this.activateRoute.snapshot.params.id) {
      this.thePlan.plan_id = this.activateRoute.snapshot.params.id
      this.planService.view(this.thePlan.plan_id).subscribe(data =>{
        this.thePlan.plan = data
      })
    }
    this.servicesList(this.thePlan.plan_id)
  }

  servicesList(id: number){
    this.elservicioServicios.listServices(id).subscribe(data=>{
      this.services = data
    })
  }

  create(service: Service){
    Swal.fire({
      title: 'Agregar',
      text: "Está seguro que quiere agregar el registro?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, agregar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.thePlan.service = service
        this.service.create(this.thePlan).subscribe(data => {
          Swal.fire(
            'Agregado!',
            'Se ha agregado el servicio al plan.',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}