import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/model/bill.model';
import { Subscription } from 'src/app/model/subscription.model';
import { User } from 'src/app/model/user.model';
import { BillService } from 'src/app/services/bill.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  type:number
  bill: Bill;
  theFormGroup: FormGroup;
  trySend: boolean
  subs: Subscription[]
  constructor(private activateRoute: ActivatedRoute,
              private billService: BillService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private subService: SubscriptionService,
              private userService: UserService
  ){
    this.mode=1
    this.type = 0
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
        this.theFormGroup.patchValue({
          amout:this.bill.amount,
          date: this.bill.date,
          idSub: this.bill.subscription.id
        })
      })
    }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      amount:[0, [Validators.required, Validators.min(0)]],
      date:['',[Validators.required]],
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

  getSubs(){
    this.subService.view(this.bill.subscription.id).subscribe(data =>{
      this.bill.subscription = data
    })
  }

  ngOnInit(): void{
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
      if(currentUrl.includes('subscription')){
        this.type = 1
      }
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id && this.mode != 2){
      this.bill.id=this.activateRoute.snapshot.params.id
      this.getBill(this.bill.id)
      
    }else if(this.activateRoute.snapshot.params.id && this.mode == 2){
      this.bill.subscription.id = this.activateRoute.snapshot.params.id
      this.getSubs()
    }
    this.subsList()
  }

  create(){
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    this.trySend=true
    console.log(this.bill);
    
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.billService.create(this.bill).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        if(currentUrl.includes('subscription')){
          this.router.navigate(["bills/list/subscription/"+ this.bill.subscription.id])
        }else{
          this.router.navigate(["bills/list"])
        }
        
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
        this.router.navigate(["bills/list"])
      })
    }
  }

  btnSubs(){
    this.router.navigate(["subscriptions/view/"+this.bill.subscription.id])
  }
}
