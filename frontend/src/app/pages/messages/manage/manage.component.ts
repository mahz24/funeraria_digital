import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message.service';
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
  constructor(private activateRoute: ActivatedRoute,
    private theMessageService: MessageService,
    private router: Router,
    private theFormBuilder:FormBuilder
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
      id: [0, [Validators.required]],
      chat_id: [0, [Validators.required, Validators.min(1), Validators.max(50)]],
      content_message: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      date_send: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
      user_id: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(40)]],
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
      this.message.id = this.activateRoute.snapshot.params.id
      this.getMessage(this.message.id)
    }
  }
  getMessage(id: number) {
    this.theMessageService.view(id).subscribe(data => {
      this.message = data
      console.log(data);
    })
  }

  
  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      console.log(this.message);

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
