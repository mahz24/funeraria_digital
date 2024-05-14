import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  departments: Department[];
  constructor(private service: DepartmentService, private router: Router) {
    this.departments = []
  }

  ngOnInit(): void {
    this.list()
    console.log("holii")
  }

  list() {
    this.service.list().subscribe(data => {
      this.departments = data
      console.log(JSON.stringify(this.departments));
    })
  }

  view(id: number) {
    this.router.navigate(["departments/view/" + id])
  }

  create() {
    this.router.navigate(["departments/create"])
  }

  update(id: string) {
    this.router.navigate(["departments/update/" + id])
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
            'El departamento ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }

}
