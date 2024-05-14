import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/model/chat';
import { ChatService } from 'src/app/services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  ngOnInit(): void {
      
  }

  // mode: number;
  // chat: Chat;
  // theFormGroup: FormGroup;
  // trySend: boolean
  // constructor(private activateRoute: ActivatedRoute,
  //   private theFormBuilder: FormBuilder,
  //   private service: ChatService,
  //   private router: Router) {
  //   this.trySend = false
  //   this.mode = 1;
  //   this.chat = {
  //     id: 0, name: "", de: ""
  //   }
  //   this.configFormGroup()
  // }

  // configFormGroup() {
  //   this.theFormGroup = this.theFormBuilder.group({ 
  //     capacity: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
  //     location: ['', [Validators.required, Validators.minLength(2)]]
  //   })
  // }

  // get getTheFormGroup() {
  //   return this.theFormGroup.controls
  // }

  // //getTheaterData(){
  // //  this.theater.capacity = this.getTheFormGroup.capacity.value;
  // //  this.theater.location = this.getTheFormGroup.location.value;
  // //}

  // ngOnInit(): void {
  //   const currentUrl = this.activateRoute.snapshot.url.join('/');

  //   if (currentUrl.includes('view')) {
  //     this.mode = 1;
  //   } else if (currentUrl.includes('create')) {
  //     this.mode = 2;
  //   } else if (currentUrl.includes('update')) {
  //     this.mode = 3;
  //   }

  //   if (this.activateRoute.snapshot.params.id) {
  //     this.theater.id = this.activateRoute.snapshot.params.id;
  //     this.getChat(this.chat.id);
  //   }
  // }


  // getChat(id: number) {
  //   this.service.view(id).subscribe(data => {
  //     this.theater = data
  //     console.log("Teatro" + JSON.stringify(this.theater));
  //   })
  // }

  // create() {
  //   if (this.theFormGroup.invalid) {
  //     this.trySend = true
  //     Swal.fire("Formulario Incompleto", "Ingrese correctamente los datos solicitados", "error")
  //     return
  //   }
  //   this.service.create(this.theater).subscribe(data => {
  //     Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success")
  //     this.router.navigate(["chats/list"])
  //   })
  // }
  // update() {
  //   if (this.theFormGroup.invalid) {
  //     this.trySend = true
  //     Swal.fire("Formulario Incompleto", "Ingrese correctamente los datos solicitados", "error")
  //     return
  //   }
  //   this.service.update(this.theater).subscribe(data => {
  //     Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success")
  //     this.router.navigate(["chats/list"])
  //   })
  // }


}
