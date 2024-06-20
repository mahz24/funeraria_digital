import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Executionservice } from 'src/app/model/executionservice';
import { Service } from 'src/app/model/service.model';
import { ClientService } from 'src/app/services/client.service';
import { ExecutionserviceService } from 'src/app/services/executionservice.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  servicios: Service[];
  execution: Executionservice
  constructor(
    private executionService: ExecutionserviceService, 
    private router: Router, 
    private activateRoute: ActivatedRoute,
    private clientService: ClientService,
    private serviceService: ServiceService
  ) {
    this.servicios = []
    this.execution={
      end_date: null,
      service:{id:0, description: "", price: 0},
      client:{id:0}, client_id:0, service_id: 0
    }
  }

  ngOnInit(): void {
    this.execution.client.id = this.activateRoute.snapshot.params.id
    this.clientService.view(this.execution.client.id).subscribe(data =>{
      this.execution.client = data
      this.execution.client_id = this.execution.client.id
      this.execution.client.user.password = ""
    })
    this.list()
  }

  list() {
    this.serviceService.list().subscribe(data => {
      this.servicios = data
    })
  }

  view(id:number){
    this.router.navigate(["services/view/"+id])
  }

  create(id: number): void {
    this.serviceService.view(id).subscribe(data =>{
      this.execution.service = data
      this.execution.service_id = this.execution.service.id
    })
    this.execution.end_date = new Date()
    Swal.fire({
      title: 'Solicitud',
      text: "Está seguro que quieres solicitar el servicio?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, solicitar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        if(this.execution.service.id == 6){
          this.executionService.create(this.execution).subscribe(data => {
            Swal.fire(
              'Solicitado!',
              'Has solicitado correctamente la sepultura, ahora ingresa estos datos:',
              'success'
            )
            this.router.navigate(['burials/create/'+id])
          });
        }else if(this.execution.service.id == 5){
          this.executionService.create(this.execution).subscribe(data => {
            Swal.fire(
              'Solicitado!',
              'Has solicitado correctamente el transporte, ahora ingresa estos datos:',
              'success'
            )
            this.router.navigate(['relocations/create/'+id])
          });
        }else if(this.execution.service.id == 7){
          this.executionService.create(this.execution).subscribe(data => {
            Swal.fire(
              'Solicitado!',
              'Has solicitado correctamente la cremación, ahora ingresa estos datos:',
              'success'
            )
            this.router.navigate(['cremations/create/'+id])
          });
        }else{
          this.executionService.create(this.execution).subscribe(data => {
            Swal.fire(
              'Solicitado!',
              'Has solicitado correctamente el servicio',
              'success'
            )
            this.ngOnInit();
          });
        }
        
      }
    })
  }
}
