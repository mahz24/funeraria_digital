import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Executionservice } from 'src/app/model/executionservice';
import { ClientService } from 'src/app/services/client.service';
import { ExecutionserviceService } from 'src/app/services/executionservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  id: number
  mode: number
  executionsservices: Executionservice[];
  constructor(
    private service: ExecutionserviceService, 
    private router: Router,
    private activateRoute: ActivatedRoute,
    private clientService: ClientService
  ) {
    this.executionsservices = []
    this.id = 0
    this.mode = 1
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('list/client')) {
      this.mode = 2
      this.id = this.activateRoute.snapshot.params.id
      this.listServices()
    }else if(currentUrl.includes('list/service')){
      this.mode = 3
      this.id = this.activateRoute.snapshot.params.id
      this.listClient()
    }else{
      this.list()
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.executionsservices = data
      this.executionsservices.forEach( actual =>{
        this.clientService.view(actual.client.id).subscribe(data =>{
          actual.client = data
          actual.client.user.password = ""
        })
      })
    })
  }

  listServices() {
    this.service.listServices(this.id).subscribe(data => {
      this.executionsservices = data
    })
  }

  listClient() {
    this.service.listClients(this.id).subscribe(data => {
      this.executionsservices = data
      this.executionsservices.forEach(actual =>{
        this.clientService.view(actual.client.id).subscribe(data =>{
          actual.client = data
          actual.client.user.password = ""
        })
      })
    })
  }

  view(id: number) {
    this.router.navigate(["executionservices/view/" + id])
  }

  create() {
    if(this.mode == 1){
      this.router.navigate(["executionservices/create"])
    }else if(this.mode == 2){
      this.router.navigate(["executionservices/create/client/"+ this.id])
    }else if(this.mode == 3){
      this.router.navigate(["executionservices/create/service/"+ this.id])
    }
  }

  update(id: string) {
    this.router.navigate(["executionservices/update/" + id])
  }

  comments(id: number) {
    this.router.navigate(["comments/list/execution/" + id])
  }

  chats(id: number){
    this.router.navigate(["chats/list/execution/" + id])
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'La ejecucion del servicio ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }

}
