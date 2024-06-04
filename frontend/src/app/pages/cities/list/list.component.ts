import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city';
import { CityService } from 'src/app/services/city.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cities: City[];
  constructor(private service: CityService, private router: Router) {
    this.cities = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.cities = data
      console.log(JSON.stringify(this.cities));
    })
  }

  view(id: number) {
    this.router.navigate(["cities/view/" + id])
  }

  create() {
    this.router.navigate(["cities/create"])
  }

  update(id: string) {
    this.router.navigate(["cities/update/" + id])
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
            'La ciudad ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }

}
