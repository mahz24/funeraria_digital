import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Benefactor } from 'src/app/model/benefactor.model';
import { BenefactorService } from 'src/app/services/benefactor.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  benefactor: Benefactor[]
  mode: number
  id:number
  constructor(private service: BenefactorService, private router: Router, private userService: UserService, private activateRoute: ActivatedRoute) {
    this.benefactor = []
    this.mode = 1
    this.id = 0
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('list/holder')) {
      this.mode = 2;
    }
    if(this.mode == 1){
      this.list()
    }else if(this.mode == 2){
      this.id = this.activateRoute.snapshot.params.id
      this.lisBenefactors()
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.benefactor = data
      this.benefactor.forEach(actual =>{
        this.userService.view(actual.client.user_id).subscribe(data =>{
          actual.client.user = data
          actual.client.user.password = ""
        })
      })
    })
  }

  lisBenefactors() {
    this.service.listBenefactors(this.id).subscribe(data => {
      this.benefactor = data
      this.benefactor.forEach(actual =>{
        this.userService.view(actual.client.user_id).subscribe(data =>{
          actual.client.user = data
          actual.client.user.password = ""
        })
      })
    })
  }


  view(id: number) {
    this.router.navigate(["benefactors/view/" + id])
  }

  create() {
    if(this.mode == 1){
      this.router.navigate(["benefactors/create"])
    }else if(this.mode == 2){
    this.router.navigate(["benefactors/create/holder/"+ this.id])
    }
  }

  update(id: string) {
    this.router.navigate(["benefactors/update/" + id])
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
