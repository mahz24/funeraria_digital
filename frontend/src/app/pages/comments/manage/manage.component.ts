import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/model/comment';
import { CommentService } from 'src/app/services/comment.service';
import { json } from 'stream/consumers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number
  comment: Comment
  trySend:boolean
  theFormGroup: FormGroup
  
  constructor(private activateRoute: ActivatedRoute,
    private theCommentService: CommentService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.trySend = false
    this.comment = {
      id: 0,
      description: "",
      rating: 0,
      date_comment: null,
      executionservice_id: 0
    }
    this.configFormGroup()
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0, [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      date_comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      rating: [0, [Validators.required, Validators.min(0),Validators.max(5)]],
      executionservice_id: [0, [Validators.required, Validators.min(0),Validators.max(100)]],
    })
  }


  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.comment.id = this.activateRoute.snapshot.params.id
      this.mode=1
      this.getComment(this.comment.id)
    }
  }

  getComment(id: number) {
    this.theCommentService.view(id).subscribe(data => {
      this.comment = data
      console.log(this.comment);
      
    })
  }

  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      console.log(this.comment);

      this.theCommentService.create(this.comment).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["comments/list"])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.theCommentService.update(this.comment).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["comments/list"])
      })
    }
  }



}
