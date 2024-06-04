import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/services/department.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number;
  department: Department;
  theFormGroup: FormGroup;
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private service: DepartmentService,
    private router: Router) {
    this.trySend = false
    this.mode = 1;
    this.department = {
      id: 0, location: "", name: "", status: ""
    }
    this.configFormGroup()
  }


  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      status: [0, [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(2)]],
      name: [0, [Validators.required]],
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
      this.department.id = this.activateRoute.snapshot.params.id;
      this.getDepartment(this.department.id);
    }
  }

  getDepartment(id: number) {
    this.service.view(id).subscribe(data => {
      this.department = data
      console.log("departamento" + JSON.stringify(this.department));
    })
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Formulario Incompleto", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.create(this.department).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success")
      this.router.navigate(["departments/list"])
    })
  }


  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true
      Swal.fire("Formulario Incompleto", "Ingrese correctamente los datos solicitados", "error")
      return
    }
    this.service.update(this.department).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success")
      this.router.navigate(["departments/list"])
    })

  }

}
  mode: number; //1-> view, 2-> Create, 3-> Update
  department: Department;
  theFormGroup: FormGroup;
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
              private departmentService: DepartmentService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ){
    this.mode=1
    this.trySend=false
    this.department={
      id: 0,
      name: "",
      location:"",
      status:""
    }
    this.configFormGroup()
  }
  getDepartment(id:number){
      this.departmentService.view(id).subscribe(data =>{
        this.department = data
        console.log(this.department);
      })
    }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      location:['',[Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      status:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  ngOnInit(): void{
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id){
      this.department.id=this.activateRoute.snapshot.params.id
      this.getDepartment(this.department.id)
    }
    console.log(this.theFormGroup.controls);
    
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.departmentService.create(this.department).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["departments/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.departmentService.update(this.department).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["departments/list"])
      })
    }
  }
}
