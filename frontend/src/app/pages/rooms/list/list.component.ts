import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  mode: number
  id:number
  rooms: Room[];
  constructor(private service: RoomService, private router: Router, private activateRoute: ActivatedRoute) {
    this.rooms = []
    this.id =0
    this.mode= 1
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('list/headquarter')) {
      this.mode = 2
      this.id = this.activateRoute.snapshot.params.id
      this.listRooms()
    }else{
      this.list()
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.rooms = data
    })
  }

  listRooms() {
    this.service.listRoom(this.id).subscribe(data => {
      this.rooms = data
    })
  }

  view(id: number) {
    this.router.navigate(["rooms/view/"+id])
  }

  create() {
    if(this.mode == 1){
      this.router.navigate(["rooms/create"])
    }else if(this.mode == 2){
      this.router.navigate(["rooms/create/headquarter/"+ this.id])
    }
  }

  update(id: string) {
    this.router.navigate(["rooms/update/" + id])
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
            'La sala sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }


}
