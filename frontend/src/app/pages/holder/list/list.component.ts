import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Holder } from 'src/app/model/holder.model';
import { HolderService } from 'src/app/services/holder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  holders: Holder[]
  constructor(private service: HolderService, private router: Router) {
    this.holders = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.holders = data
      console.log(JSON.stringify(this.holders));
    })
  }

  view(id: number) {
    this.router.navigate(["holders/view/" + id])
  }

  create() {
    this.router.navigate(["holders/create"])
  }

  update(id: string) {
    this.router.navigate(["holders/update/" + id])
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
