import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Causa } from 'src/app/model/causa.model';
import { Difunto } from 'src/app/model/difunto.model';
import { CausaService } from 'src/app/services/causa.service';
import { DifuntosService } from 'src/app/services/difuntos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  difunto: Difunto;
  theFormGroup: FormGroup;
  trySend: boolean
  causas:Causa[]
  constructor(private activateRoute: ActivatedRoute,
              private difuntoService: DifuntosService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private causaService: CausaService
  ){
    this.mode=1
    this.trySend=false
    this.difunto={
      id: 0,
      nombre: "",
      fecha:null,
      causa:{
        id: 0,
        nombre: ""
      }
    }
    this.configFormGroup()
  }


  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      nombre:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      fecha:[null,[Validators.required]],
      causa:[0, Validators.required]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  causasList(){
    this.causaService.list().subscribe(data=>{
      this.causas = data
      console.log(this.causas);
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
   
    this.causasList()
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.difuntoService.create(this.difunto).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        this.router.navigate(["difuntos/list"])
      })
    }
  }

}
