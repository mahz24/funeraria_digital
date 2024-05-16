import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headquarter } from 'src/app/model/headquarter';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  headquarters: Headquarter[];
  constructor(private service: HeadquarterService, private router: Router) {
    this.headquarters = []
  }

  ngOnInit(): void {
    this.list()
    console.log("holii")
  }

  list() {
    this.service.list().subscribe(data => {
      this.headquarters = data
      console.log(JSON.stringify(this.headquarters));
    })
  }

  view(id: number) {
    this.router.navigate(["headquarters/view/" + id])
  }

  create() {
    this.router.navigate(["headquarters/create"])
  }

  update(id: string) {
    this.router.navigate(["headquarters/update/" + id])
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
            'La sede ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }

}
