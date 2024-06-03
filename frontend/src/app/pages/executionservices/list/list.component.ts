import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Executionservice } from 'src/app/model/executionservice';
import { ExecutionserviceService } from 'src/app/services/executionservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  executionsservices: Executionservice[];
  constructor(private service: ExecutionserviceService, private router: Router) {
    this.executionsservices = []
  }

  ngOnInit(): void {
    this.list()
    console.log("holii")
  }

  list() {
    this.service.list().subscribe(data => {
      this.executionsservices = data
      console.log(JSON.stringify(this.executionsservices));
    })
  }

  view(id: number) {
    this.router.navigate(["executionservices/view/" + id])
  }

  create() {
    this.router.navigate(["executionservices/create"])
  }

  update(id: string) {
    this.router.navigate(["executionservices/update/" + id])
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
