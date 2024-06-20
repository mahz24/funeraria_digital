import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  clients: Client[];
  constructor(private service: ClientService, private router: Router) {
    this.clients = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.clients = data
    })
  }

  view(id: number) {
    this.router.navigate(["clients/view/"+id])
  }

  create() {
    this.router.navigate(["clients/create"])
  }

  update(id: string) {
    this.router.navigate(["clients/update/" + id])
  }

  subscription(id: number){
    this.router.navigate(["subscriptions/list/client/" + id])
  }

  execution(id: number){
    this.router.navigate(["executionservices/list/client/"+ id])
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
            'El cliente ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }

}
