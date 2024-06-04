import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Relocation } from 'src/app/model/relocation';
import { RelocationService } from 'src/app/services/relocation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  relocations: Relocation[];
  constructor(private service: RelocationService, private router: Router) {
    this.relocations = []
  }

  ngOnInit(): void {
    this.list()
    console.log("holii")
  }

  list() {
    this.service.list().subscribe(data => {
      this.relocations = data
      console.log(JSON.stringify(this.relocations));
    })
  }

  view(id: number) {
    this.router.navigate(["relocations/view/" + id])
  }

  create() {
    this.router.navigate(["relocations/create"])
  }

  update(id: string) {
    this.router.navigate(["relocations/update/" + id])
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
            'La reubicacion ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }


}
