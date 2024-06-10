import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Relocation } from 'src/app/model/relocation';
import { RelocationService } from 'src/app/services/relocation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number
  relocation: Relocation
  trySend: boolean
  theFormGroup: FormGroup
  estados:String[]
  constructor(private activateRoute: ActivatedRoute,
    private service: RelocationService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.trySend = false
    this.estados = ["REALIZADO","PENDIENTE","CANCELADO"]
    this.relocation = {
      id: 0,
      location: "",
      status: "",
      departure_time: null,
      arrival_time: null,
      service:{
        id:null,
        description:"",
        price:0
      }
    }
    this.configFormGroup()
  }


  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      status: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      departure_time: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      arrival_time: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      idService:[null, Validators.required],
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
      this.relocation.id = this.activateRoute.snapshot.params.id
      this.getPS(this.relocation.id)
    }
  }
  getPS(id: number) {
    this.service.view(id).subscribe(data => {
      this.relocation = data
      this.theFormGroup.patchValue({
        status: this.relocation.status,
        location: this.relocation.location,
        departure_time: this.relocation.departure_time,
        arrival_time: this.relocation.arrival_time,
        idService: this.relocation.service.id
      })
    })
  }

    
  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      console.log(this.relocation);

      this.service.create(this.relocation).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["relocations/list"])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.relocation).subscribe(data => {
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["relocations/list"])
      })
    }
  }


}
