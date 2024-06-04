import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/model/bill.model';
import { Subscription } from 'src/app/model/subscription.model';
import { BillService } from 'src/app/services/bill.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  bill: Bill;
  theFormGroup: FormGroup;
  trySend: boolean
  subs: Subscription[]
  constructor(private activateRoute: ActivatedRoute,
              private billService: BillService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private subService: SubscriptionService
  ){
    this.mode=1
    this.trySend=false
    this.bill={
      id: 0,
      amount: 0,
      date: null,
      subscription:{
        id: null,
        activation_date: null,
      }
    }
    this.configFormGroup()
  }
  getBill(id:number){
      this.billService.view(id).subscribe(data =>{
        this.bill = data
      })
    }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      amount:[0, [Validators.required, Validators.min(0)]],
      date:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      idSub:[null, Validators.required]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  subsList(){
    this.subService.list().subscribe(data =>{
      this.subs = data
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
      this.bill.id=this.activateRoute.snapshot.params.id
      this.getBill(this.bill.id)
    }
    this.subsList()
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.billService.create(this.bill).subscribe(data=>{
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
      this.billService.update(this.bill).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["cities/list"])
      })
    }
  }
}
