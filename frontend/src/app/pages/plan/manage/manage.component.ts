import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/model/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  plan: Plan;
  theFormGroup: FormGroup;
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
              private planService: PlanService,
              private router: Router,
              private theFormBuilder: FormBuilder
  ){
    this.mode=1
    this.trySend=false
    this.plan={
      id: 0,
      name: "",
      description: "",
      price: 0,
      beneficiaries_number: 0,
      discount: 0
    }
    this.configFormGroup()
  }
  getPlan(id:number){
      this.planService.view(id).subscribe(data =>{
        this.plan = data
        console.log(this.plan);
      })
    }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.min(1)]],
      beneficiaries_number:[0, [Validators.required, Validators.min(1), Validators.max(8)]],
      discount:[0, [Validators.required, Validators.min(0), Validators.max(80)]]
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
      this.plan.id=this.activateRoute.snapshot.params.id
      this.getPlan(this.plan.id)
    }
    console.log(this.theFormGroup.controls);
    
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.planService.create(this.plan).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["plans/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.planService.update(this.plan).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["plans/list"])
      })
    }
  }
}
