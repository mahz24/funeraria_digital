import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Burial } from 'src/app/model/burial';
import { BurialService } from 'src/app/services/burial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  burials: Burial[];
  constructor(private service: BurialService, private router: Router) {
    this.burials = []
  }

  ngOnInit(): void {
    this.list()
    console.log("holii")
  }

  list() {
    this.service.list().subscribe(data => {
      this.burials = data
      console.log(JSON.stringify(this.burials));
    })
  }

  view(id: number) {
    this.router.navigate(["burials/view/" + id])
  }

  create() {
    this.router.navigate(["burials/create"])
  }

  update(id: string) {
    this.router.navigate(["burials/update/" + id])
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
