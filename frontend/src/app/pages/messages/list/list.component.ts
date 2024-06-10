import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  messages: Message[];
  constructor(private service: MessageService, private router: Router, private userService: UserService) {
    this.messages = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.messages = data
      this.messages.forEach(actual =>{
        this.userService.view(actual.user_id).subscribe(data =>{
          actual.user = data
          actual.user.password = ""
          
        })
      })
      console.log(this.messages);
      
    })
  }

  view(id: number) {
    this.router.navigate(["messages/view/" + id])
  }

  create() {
    this.router.navigate(["messages/create"])
  }

  update(id: string) {
    this.router.navigate(["messages/update/" + id])
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
            'El mensaje ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
