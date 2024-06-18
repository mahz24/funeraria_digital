import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Headquarter } from 'src/app/model/headquarter';
import { Room } from 'src/app/model/room';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number
  room: Room
  trySend: boolean
  theFormGroup: FormGroup
  estados: String[]
  headquarters: Headquarter[]
  constructor(private activateRoute: ActivatedRoute,
    private theRoomService: RoomService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private headquarterService: HeadquarterService
  ) {
    this.mode = 1;
    this.estados = ["ACTIVO", "INACTIVO"]
    this.room = {
      num: 0,
      description: "",
      capacity: 0,
      name: "",
      status: "",
      headquarter_id: 0
    }
    this.configFormGroup()
  }


  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      capacity: [0, [Validators.required, Validators.min(2), Validators.max(50)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      status: ['', [Validators.required]],
      headquarter_id: [0, [Validators.required, Validators.min(1), Validators.max(50)]],
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
      this.room.num = this.activateRoute.snapshot.params.id
      this.getRoom(this.room.num)
    }
    this.headquartersList()
  }
  getRoom(num: number) {
    this.theRoomService.view(num).subscribe(data => {
      this.room = data
    })
  }

  headquartersList(){
    this.headquarterService.list().subscribe(data =>{
      this.headquarters = data
    })
  }


  create() {
    this.trySend = true
    console.log(this.room);
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.theRoomService.create(this.room).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["rooms/list"])
      })
    }
  }

  update() {
    this.trySend = true
    console.log(this.room);
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.theRoomService.update(this.room).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["rooms/list"])
      })
    }
  }


}