import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/model/chat';
import { ChatService } from 'src/app/services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  chats: Chat[];
  id: number
  mode: number
  constructor(private service: ChatService, private router: Router, private activateRoute: ActivatedRoute) {
    this.chats = []
    this.id = 0
    this.mode = 1
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('list/execution')) {
      this.mode = 2;
    }
    if(this.mode == 1){
      this.list()
    }else if(this.mode == 2){
      this.id = this.activateRoute.snapshot.params.id
      this.listChats()
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.chats = data
    })
  }

  listChats() {
    this.service.listChats(this.id).subscribe(data => {
      this.chats = data
    })
  }

  view(id: number) {
    this.router.navigate(["chats/chat/" + id])
  }

  create() {
    this.router.navigate(["chats/create"])
  }

  update(id: string) {
    this.router.navigate(["chats/update/" + id])
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
            'El chat ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }


}
