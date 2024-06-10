import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Planservice } from 'src/app/model/planservice';
import { PlanserviceService } from 'src/app/services/planservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  planservice: Planservice[];
  constructor(private service: PlanserviceService, private router: Router) {
    this.planservice = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.planservice = data
      console.log(JSON.stringify(this.planservice));
    })
  }

  view(id: number) {
    this.router.navigate(["planservices/view/" + id])
  }

  create() {
    this.router.navigate(["planservices/create"])
  }

  update(id: string) {
    this.router.navigate(["planservices/update/" + id])
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
