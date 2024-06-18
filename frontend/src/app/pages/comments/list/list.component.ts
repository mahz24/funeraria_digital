import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { privateDecrypt } from 'crypto';
import { Comment } from 'src/app/model/comment';
import { CommentService } from 'src/app/services/comment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  comments: Comment[];
  mode: number
  id:number
  constructor(
    private service: CommentService, 
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.comments = []
    this.mode = 1
    this.id = 0
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('list/execution')) {
      this.mode = 2
      this.id = this.activateRoute.snapshot.params.id
      this.listComments(this.id)
    }else{
      this.list()
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.comments = data
    })
  }

  listComments(id:number){
    this.service.listComments(id).subscribe(data => {
      this.comments = data
    })
  }

  view(id: number) {
    this.router.navigate(["comments/view/" + id])
  }

  create() {
    if(this.mode == 1){
      this.router.navigate(["comments/create"])
    }else if(this.mode == 2)
    this.router.navigate(["comments/create/execution/"+ this.id])
  }

  update(id: string) {
    this.router.navigate(["comments/update/" + id])
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
            'El comentario ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
