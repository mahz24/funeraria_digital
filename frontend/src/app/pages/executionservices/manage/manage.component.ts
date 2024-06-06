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
  trySend: boolean
  executionservice: Executionservice
  theFormGroup: FormGroup
  services: Service[]
  clients: Client[]
  profile: Profile[]
  constructor(private activateRoute: ActivatedRoute,
    private theExe: ExecutionserviceService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private serviceSer: ServiceService,
    private clientservice: ClientService,
    private userService: UserService

  ) {
    this.mode = 1;
    this.trySend = false
    this.profile = []
    this.clients = []
    this.services = []
    this.executionservice = {
      id: 0,
      client_id: 0,
      service_id: 0,
      end_date: null,
      client: {
        user_id: "",
        gender: "",
        is_alive: true,
        user: {
          Full_name: "",
        }
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
      id: [0, [Validators.required]],
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
      console.log(this.clients);

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
      this.executionservice.id = this.activateRoute.snapshot.params.id
      this.getChat(this.executionservice.id)
    }
  }
  getChat(id: number) {
    this.theExe.view(id).subscribe(data => {
      this.executionservice = data
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
        this.router.navigate(["executionservices/list"])
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

