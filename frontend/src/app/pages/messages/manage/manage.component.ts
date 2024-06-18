import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number
  message: Message
  trySend:boolean
  theFormGroup:FormGroup
  users: User[]
  constructor(private activateRoute: ActivatedRoute,
    private theMessageService: MessageService,
    private router: Router,
    private theFormBuilder:FormBuilder,
    private userService: UserService
  ) {
    this.mode = 1;
    this.trySend=false
    this.message = {
      id: 0,
      chat_id: 0,
      content_message: "",
      date_send: null,
      user_id: ""
    }
    this.configFormGroup()
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      chat_id: [0, [Validators.required, Validators.min(1), Validators.max(50)]],
      content_message: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      date_send: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
      user_id: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
    })
  }


  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  listUsers(){
    this.userService.list().subscribe(data=>{
      this.users = data
      console.log(this.users);
      
      this.users.forEach(actual =>{
        actual.password = ""
      })
    })
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
      this.message.id = this.activateRoute.snapshot.params.id
      this.getMessage(this.message.id)
    }
    this.listUsers()
  }
  getMessage(id: number) {
    this.theMessageService.view(id).subscribe(data => {
      this.message = data
      this.theFormGroup.patchValue({
        chat_id: this.message.chat_id,
        content_message: this.message.content_message,
        date_send: this.message.date_send,
        user_id: this.message.user_id
      })
    })
  }

  
  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      console.log(JSON.stringify(this.message));

      this.theMessageService.create(this.message).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["messages/list"])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.theMessageService.update(this.message).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["messages/list"])
      })
    }
  }

}
