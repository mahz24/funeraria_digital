import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  mode: number
  id: number
  constructor(private service: PlanserviceService, private router: Router, private activateRoute: ActivatedRoute) {
    this.planservice = []
    this.mode = 1
    this.id = 0
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('list/plan')) {
      this.mode = 2;
    }else if(currentUrl.includes('list/sub')){
      this.mode = 3;
    }
    if(this.mode == 1){
      this.list()
    }else if(this.mode == 2 || this.mode == 3){
      this.id = this.activateRoute.snapshot.params.id
      this.listServices()
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.planservice = data
    })
  }

  listServices() {
    this.service.listServices(this.id).subscribe(data => {
      this.planservice = data
    })
  }

  viewService(id: number) {
    this.router.navigate(["services/view/" + id])
  }
  viewPlan(id: number) {
    this.router.navigate(["plans/view/" + id])
  }

  create() {
    this.router.navigate(["planservices/create/plan/"+ this.id])
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
