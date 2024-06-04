import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city';
import { Department } from 'src/app/model/department';
import { CityService } from 'src/app/services/city.service';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  city: City;
  theFormGroup: FormGroup;
  trySend: boolean
  departments:Department[]
  constructor(private activateRoute: ActivatedRoute,
              private cityService: CityService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private departmentService: DepartmentService
  ){
    this.mode=1
    this.trySend=false
    this.city={
      id: 0,
      name: "",
      location:"",
      status:"",
      department:{
        id: null,
        name: "",
        location:"",
        status:"",
      }
    }
    this.configFormGroup()
  }
  getCity(id:number){
      this.cityService.view(id).subscribe(data =>{
        this.city = data
      })
    }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      location:['',[Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      status:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      idDepartment:[null, Validators.required]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  departmentList(){
    this.departmentService.list().subscribe(data=>{
      this.departments = data
    })
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
      this.city.id=this.activateRoute.snapshot.params.id
      this.getCity(this.city.id)
    }
    this.departmentList()
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.cityService.create(this.city).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["cities/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.cityService.update(this.city).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["cities/list"])
      })
    }
  }

  btnDeparment(){
    this.router.navigate(["/departments/view/"+this.city.department.id])
  }
}
