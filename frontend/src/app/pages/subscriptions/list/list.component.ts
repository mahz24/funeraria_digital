import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/model/subscription.model';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  subs: Subscription[];
  mode: number
  id: number
  constructor(private service: SubscriptionService, 
    private router: Router, 
    private userService: UserService,
    private activateRoute: ActivatedRoute
  ) {
    this.subs = []
    this.mode = 1
    this.id = 0
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('list/client')) {
      this.mode = 2;
    }
    if(this.mode == 1){
      this.list()
    }else if(this.mode == 2){
      this.id = this.activateRoute.snapshot.params.id
      this.listPlans()
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.subs = data
      this.subs.forEach(actual =>{
        this.userService.view(actual.client.user_id).subscribe(data =>{
          actual.client.user = data
        })
      })
    })
  }

  listPlans() {
    this.service.listPlans(this.activateRoute.snapshot.params.id).subscribe(data => {
      this.subs = data
      this.subs.forEach(actual =>{
        this.userService.view(actual.client.user_id).subscribe(data =>{
          actual.client.user = data
        })
      })
    })
  }

  view(id: number) {
    this.router.navigate(["subscriptions/view/" + id])
  }

  create() {
    if(this.mode == 1){
      this.router.navigate(["subscriptions/create"])
    }else if(this.mode == 2)
    this.router.navigate(["subscriptions/create/client/"+ this.id])
  }

  update(id: string) {
      this.router.navigate(["subscriptions/update/" + id])
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

  bills(id: number){
    this.router.navigate(["bills/list/subscription/" + id])
  }
}
