import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city';
import { Headquarter } from 'src/app/model/headquarter';
import { CityService } from 'src/app/services/city.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  headquarter: Headquarter;
  theFormGroup: FormGroup;
  trySend: boolean
  cities: City[]
  constructor(private activateRoute: ActivatedRoute,
              private headquarterService: HeadquarterService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private cityService: CityService
  ){
    this.mode=1
    this.trySend=false
    this.headquarter={
      id: 0,
      name: "",
      direction:"",
      status:0,
      description:'',
      city:{
        id: null,
        name: "",
        location:"",
        status:"",
      }
    }
    this.configFormGroup()
  }
  getHeadquarter(id:number){
      this.headquarterService.view(id).subscribe(data =>{
        this.headquarter = data
      })
    }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      direction:['',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description:['',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      status:['',[Validators.required, Validators.min(1),Validators.max(4)]],
      idCity:[null, Validators.required]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  citiesList(){
    this.cityService.list().subscribe(data=>{
      this.cities = data
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
      this.headquarter.id=this.activateRoute.snapshot.params.id
      this.getHeadquarter(this.headquarter.id)
    }
    this.citiesList()
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.headquarterService.create(this.headquarter).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["headquarters/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.headquarterService.update(this.headquarter).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["headquarters/list"])
      })
    }
  }

  btnDeparment(){
    this.router.navigate(["/cities/view/"+this.headquarter.city.id])
  }
}
