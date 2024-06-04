import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/model/chat';
import { Executionservice } from 'src/app/model/executionservice';
import { ChatService } from 'src/app/services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number
  chat: Chat
  trySend: boolean
  theFormGroup: FormGroup
  estados:String[]
  constructor(private activateRoute: ActivatedRoute,
    private theChatService: ChatService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1
    this.trySend = false
    this.estados = ["ACTIVO","INACTIVO"]
    this.chat = {
      id: 0,
      name: "",
      status: "",
      executionservice_id: 0
    }
    this.configFormGroup()
  }

  getChat(id: number) {
    this.theChatService.view(id).subscribe(data => {
      this.chat = data
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      status: ['', [Validators.required]],
      executionservice_id: [0, [Validators.required, Validators.min(0),Validators.max(10000)]],
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
      this.chat.id = this.activateRoute.snapshot.params.id
      this.getChat(this.chat.id)
    }
  }

  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      console.log(this.chat);

      this.theChatService.create(this.chat).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["chats/list"])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.theChatService.update(this.chat).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["chats/list"])
      })
    }
  }


}


