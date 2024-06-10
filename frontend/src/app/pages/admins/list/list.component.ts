import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  admins: Admin[];
  constructor(private service: AdminService, private router: Router, private userService: UserService) {
    this.admins = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.admins = data
      this.admins.forEach(actual =>{
        this.userService.view(actual.user_id).subscribe(data =>{
          actual.user = data
        })
      })
    })
  }

  view(id: number) {
    this.router.navigate(["admins/view/"+id])
  }

  create() {
    this.router.navigate(["admins/create"])
  }

  update(id: string) {
    this.router.navigate(["admins/update/" + id])
  }

  delete(id: number, user_id: String): void {
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
          this.userService.deleteProfile(user_id).subscribe(data =>{
            this.userService.delete(user_id).subscribe(data =>{
              Swal.fire(
                'Eliminado!',
                'El cliente ha sido eliminada correctamente',
                'success'
              )
              this.ngOnInit();
            })
          })
        });
      }
    })
  }
}
