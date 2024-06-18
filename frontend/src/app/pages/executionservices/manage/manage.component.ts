import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { Executionservice } from 'src/app/model/executionservice';
import { Profile } from 'src/app/model/profile.model';
import { Service } from 'src/app/model/service.model';
import { ClientService } from 'src/app/services/client.service';
import { ExecutionserviceService } from 'src/app/services/executionservice.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number
  type: number
  trySend:boolean
  executionservice: Executionservice
  theFormGroup: FormGroup
  services: Service[]
  clients: Client[]
  profile: Profile[]
  constructor(private activateRoute: ActivatedRoute,
    private theExe: ExecutionserviceService,
    private router: Router,
    private theFormBuilder:FormBuilder,
    private serviceSer:ServiceService,
    private clientservice:ClientService,
    private userService: UserService
  ) {
    this.mode = 1;
    this.type = 0
    this.trySend=false
    this.profile = []
    this.clients = []
    this.services = []
    this.executionservice = {
      id: 0,
      client_id: 0,
      service_id: 0,
      end_date:null,
      client:{
        user_id:"",
        gender:"",
        is_alive:true,
      },
      service: {
        description: "",
        price: 0
      }
    }
    this.configFormGroup()
    this.servicesList()
    this.clientsList()
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      client_id: [0, [Validators.required, Validators.min(1), Validators.max(50)]],
      end_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      service_id: [0, [Validators.required, Validators.min(1), Validators.max(50)]],
    })
  }


  servicesList() {
    this.serviceSer.list().subscribe(data => {
      this.services = data
    })
  }


  clientsList() {
    this.clientservice.list().subscribe(data => {
      this.clients = data
      this.clients.forEach(client => {
        console.log(this.userService.getProfile(client.user_id));
      });

    })
  }

  p() {
    this.clientservice.list().subscribe(data => {
      this.clients = data
      this.clients.forEach(actual =>{
        this.userService.view(actual.user_id).subscribe(data =>{
          actual.user = data
          actual.user.password = ""
        })
      })
      
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
      if(currentUrl.includes('create/client')){
        this.type = 1
      }else if(currentUrl.includes('create/service')){
        this.type = 2
      }
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id && this.mode != 2) {
      this.executionservice.id = this.activateRoute.snapshot.params.id
      this.getExecution(this.executionservice.id)
    }
    if(this.activateRoute.snapshot.params.id && this.mode == 2 && this.type == 1){
      this.executionservice.client.id = this.activateRoute.snapshot.params.id
    }
    if(this.activateRoute.snapshot.params.id && this.mode == 2 && this.type == 2){
      this.executionservice.service.id = this.activateRoute.snapshot.params.id
    }
  }
  getExecution(id: number) {
    this.theExe.view(id).subscribe(data => {
      this.executionservice = data

      this.theFormGroup.patchValue({
        client_id: this.executionservice.client_id,
        service_id: this.executionservice.service_id,
        end_date: this.executionservice.end_date
      })
    })
  }

  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      console.log(this.executionservice);

      this.theExe.create(this.executionservice).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        if(this.type == 0){
          this.router.navigate(["executionservices/list"])
        }else if(this.type == 1){
          this.router.navigate(["executionservices/list/client/"+ this.executionservice.client.id])
        }else if(this.type == 2){
          this.router.navigate(["executionservices/list/service/"+ this.executionservice.service.id])
        }
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.theExe.update(this.executionservice).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["executionservices/list"])
      })
    }
  }

}

