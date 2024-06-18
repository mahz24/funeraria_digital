import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/model/bill.model';
import { BillService } from 'src/app/services/bill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  bills: Bill[];
  mode: number
  id: number
  constructor(private service: BillService, private router: Router, private activateRoute: ActivatedRoute) {
    this.bills = []
    this.mode = 1
    this.id = 0
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('list/subscription')) {
      this.mode = 2;
    }
    if(this.mode == 1){
      this.list()
    }else if(this.mode == 2){
      this.id = this.activateRoute.snapshot.params.id
      this.listBills()
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.bills = data
    })
  }

  listBills() {
    this.service.listBills(this.activateRoute.snapshot.params.id).subscribe(data => {
      this.bills = data
    })
  }

  view(id: number) {
    this.router.navigate(["bills/view/" + id])
  }

  create() {
    if(this.mode == 1){
      this.router.navigate(["bills/create"])
    }else if(this.mode == 2){
    this.router.navigate(["bills/create/subscription/"+ this.id])
    }
  }

  update(id: string) {
    this.router.navigate(["bills/update/" + id])
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
