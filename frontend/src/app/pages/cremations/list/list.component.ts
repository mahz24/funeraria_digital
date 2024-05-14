import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cremation } from 'src/app/model/cremation';
import { CremationService } from 'src/app/services/cremation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cremations: Cremation[];
  constructor(private service: CremationService, private router: Router) {
    this.cremations = []
  }

  ngOnInit(): void {
    this.list()
    console.log("holii")
  }

  list() {
    this.service.list().subscribe(data => {
      this.cremations = data
      console.log(JSON.stringify(this.cremations));
    })
  }

  view(id: number) {
    this.router.navigate(["cremations/view/" + id])
  }

  create() {
    this.router.navigate(["cremations/create"])
  }

  update(id: string) {
    this.router.navigate(["cremations/update/" + id])
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
            'La cremacion ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }


}
