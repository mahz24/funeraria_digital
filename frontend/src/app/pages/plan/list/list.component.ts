import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/model/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  plans: Plan[];
  constructor(private service: PlanService, private router: Router) {
    this.plans = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.plans = data
      console.log(JSON.stringify(this.plans));
    })
  }

  view(id: number) {
    this.router.navigate(["plans/view/" + id])
  }

  create() {
    this.router.navigate(["plans/create"])
  }

  update(id: string) {
    this.router.navigate(["plans/update/" + id])
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
            'La sepultura ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
