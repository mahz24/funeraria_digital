import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Benefactor } from 'src/app/model/benefactor.model';
import { Client } from 'src/app/model/client';
import { Holder } from 'src/app/model/holder.model';
import { BenefactorService } from 'src/app/services/benefactor.service';
import { ClientService } from 'src/app/services/client.service';
import { HolderService } from 'src/app/services/holder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  benefactor: Benefactor
  theFormGroup: FormGroup;
  trySend: boolean
  clients: Client[]
  holders: Holder[]
  type: number
  constructor(private activateRoute: ActivatedRoute,
              private benefactorService: BenefactorService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private clientService: ClientService,
              private holderService: HolderService
  ){
    this.mode=1
    this.type = 0
    this.trySend=false
    this.benefactor={
      id: 0,
      isprincipal_benefactor: null, isemergency_contact: null, client:{id:0}, holder:{id:0}
    }
    this.clients = []
    this.holders = []
    this.configFormGroup()
  }

  getBenefactor(id:number){
    this.benefactorService.view(id).subscribe(data =>{
      this.benefactor = data
      this.clientService.view(this.benefactor.client.id).subscribe(data =>{
        this.benefactor.client = data
        this.benefactor.client.user.password = ""
      })        
    })
  }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      idClient:[null, Validators.required],
      idHolder: [null, Validators.required],
      isprincipal_benefactor: [null, Validators.required],
      isemergency_contact:[null, Validators.required]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  clientsList(){
    this.clientService.listNon().subscribe(data=>{
      this.clients = data
    })
  }

  holderList(){
    this.holderService.list().subscribe(data=>{
      this.holders = data
      this.holders.forEach(actual =>{
        this.clientService.view(actual.client.id).subscribe(data =>{
          actual.client = data
          actual.client.user.password = ""
        })
      })
    })
  }

  ngOnInit(): void{
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
      if(currentUrl.includes('holder')){
        this.type = 1
      }
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id && this.mode != 2){
      this.benefactor.id=this.activateRoute.snapshot.params.id
      this.getBenefactor(this.benefactor.id)
    }else if(this.activateRoute.snapshot.params.id && this.mode == 2){
      this.benefactor.holder.id = this.activateRoute.snapshot.params.id
    }
    this.clientsList()
    this.holderList()
  }

  create(){
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.benefactorService.create(this.benefactor).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        if(currentUrl.includes('holder')){
          this.router.navigate(["benefactors/list/holder/"+ this.benefactor.holder.id])
        }else{
          this.router.navigate(["benefactors/list"])
        }
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.benefactorService.update(this.benefactor).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["benefactors/list"])
      })
    }
  }

  btnClient(){
    this.router.navigate(["/clients/view/"+this.benefactor.client.id])
  }
}
