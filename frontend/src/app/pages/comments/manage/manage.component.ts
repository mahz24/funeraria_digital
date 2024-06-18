import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/model/comment';
import { Executionservice } from 'src/app/model/executionservice';
import { CommentService } from 'src/app/services/comment.service';
import { ExecutionserviceService } from 'src/app/services/executionservice.service';
import { json } from 'stream/consumers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number
  type: number
  comment: Comment
  executions:Executionservice[]
  trySend:boolean
  theFormGroup: FormGroup
  
  constructor(private activateRoute: ActivatedRoute,
    private theCommentService: CommentService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private executionService: ExecutionserviceService
  ) {
    this.mode = 1;
    this.type = 0
    this.trySend = false
    this.comment = {
      id: 0,
      description: "",
      rating: 0,
      date_comment: null,
      executionservice_id: 0
    }
    this.executions = []
    this.configFormGroup()
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      date_comment: ['', [Validators.required]],
      rating: [0, [Validators.required, Validators.min(0),Validators.max(5)]],
      executionservice_id: [0, [Validators.required]],
    })
  }


  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  executionList(){
    this.executionService.list().subscribe(data =>{
      this.executions = data
    })
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
      if(currentUrl.includes('create/execution')){
        this.type = 1
      }
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id && this.mode != 2) {
      this.comment.id = this.activateRoute.snapshot.params.id
      this.getComment(this.comment.id)
    }
    if(this.activateRoute.snapshot.params.id && this.mode == 2){
      this.comment.executionservice_id = this.activateRoute.snapshot.params.id
    }
    this.executionList()
  }

  getComment(id: number) {
    this.theCommentService.view(id).subscribe(data => {
      this.comment = data
      this.theFormGroup.patchValue({
        description: this.comment.description,
        date_comment: this.comment.date_comment,
        rating: this.comment.rating,
        executionservice_id: this.comment.executionservice_id
      })      
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
        if(this.type == 1){
          this.router.navigate(["comments/list/execution/"+ this.comment.executionservice_id])
        }else{
          this.router.navigate(["comments/list"])
        }
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
