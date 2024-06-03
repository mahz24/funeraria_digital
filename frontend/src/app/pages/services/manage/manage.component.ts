import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/model/service.model';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  service: Service;
  theFormGroup: FormGroup;
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
              private serviceService:ServiceService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ){
    this.mode=1
    this.trySend=false
    this.service={
      id: 0,
      description: "",
      price: 0,
      status: ""
    }
    this.configFormGroup()
  }
  getService(id:number){
      this.serviceService.view(id).subscribe(data =>{
        
        this.service = data
        console.log(this.service);
      })
    }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.min(1), Validators.max(1000000)]],
      status:['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]]
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
      this.service.id=this.activateRoute.snapshot.params.id
      this.getService(this.service.id)
    }
    console.log(this.theFormGroup.controls);
    
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.serviceService.create(this.service).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["services/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.serviceService.update(this.service).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["services/list"])
      })
    }
  }

}
