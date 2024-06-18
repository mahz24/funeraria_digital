import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cremation } from 'src/app/model/cremation';
import { Room } from 'src/app/model/room';
import { CremationService } from 'src/app/services/cremation.service';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
}) export class ManageComponent implements OnInit {
  mode: number
  cremation: Cremation
  trySend: boolean
  theFormGroup: FormGroup
  estados:String[]
  rooms: Room[]
  constructor(private activateRoute: ActivatedRoute,
    private service: CremationService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private roomService: RoomService
  ) {
    this.mode = 1;
    this.trySend = false
    this.estados = ["REALIZADO","PENDIENTE","CANCELADO"]
    this.cremation = {
      id: 0,
      service_id: 0,
      cremation_date: null,
      status: "",
      room_id: 0,
      room:{
        num: null, name:"", description:"", capacity:0, status:""
      }
    }
    this.configFormGroup()
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      cremation_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      status: ['', [Validators.required,]],
      room_id: [0, [Validators.required, Validators.min(1), Validators.max(50)]],
      service_id: [0, [Validators.required]],
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
      this.cremation.id = this.activateRoute.snapshot.params.id
      this.getPS(this.cremation.id)
    }
    this.roomsList()
  }

  getPS(id: number) {
    this.service.view(id).subscribe(data => {
      this.cremation = data
      this.theFormGroup.patchValue({
        cremation_date: this.cremation.cremation_date,
        status: this.cremation.status,
        room_id: this.cremation.room_id,
        service_id: this.cremation.service_id
      })
    })
  }

  roomsList(){
    this.roomService.list().subscribe(data =>{
      this.rooms = data
    })
  }

  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      console.log(this.cremation);

      this.service.create(this.cremation).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["cremations/list"])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.cremation).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["cremations/list"])
      })
    }
  }
}