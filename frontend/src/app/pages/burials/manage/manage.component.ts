import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Burial } from 'src/app/model/burial';
import { Room } from 'src/app/model/room';
import { Service } from 'src/app/model/service.model';
import { BurialService } from 'src/app/services/burial.service';
import { RoomService } from 'src/app/services/room.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  type: number
  burial: Burial;
  theFormGroup: FormGroup;
  trySend: boolean
  services: Service[];
  rooms: Room[];
  constructor(private activateRoute: ActivatedRoute,
              private burialService:BurialService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private theServiceService: ServiceService,
              private theRoomService: RoomService
  ){
    this.mode=1
    this.type = 0
    this.trySend=false
    this.services=[]
    this.burial={
      id: 0,
      location: "",
      burial_type: "",
      burial_date: null,
      service:{
        id:null,
        description:"",
        price: 0,
        status: ""
      },
      room:{
        num:null,
        name:"",
        description:"",
        capacity: 0,
        status:""
      }
    }
    this.configFormGroup()
  }
  
  getBurial(id:number){
      this.burialService.view(id).subscribe(data =>{
        this.burial = data

        this.theFormGroup.patchValue({
          location: this.burial.location,
          burial_type: this.burial.burial_type,
          burial_date: this.burial.burial_date,
          idService: this.burial.service.id,
          idRoom: this.burial.room.num
        })
      })
    }

  servicesList(){
    this.theServiceService.list().subscribe(data=>{
      this.services = data
    })
  }

  roomsList(){
    this.theRoomService.list().subscribe(data=>{
      this.rooms = data
    })
  }
  
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      burial_type: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      burial_date:[null, [Validators.required]],
      idService:[null, [Validators.required]],
      idRoom:[null, [Validators.required]]
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
      if(this.activateRoute.snapshot.params.id){
        this.type= 1
      }
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id && this.mode !=2){
      this.burial.id=this.activateRoute.snapshot.params.id
      this.getBurial(this.burial.id)
    }else if(this.activateRoute.snapshot.params.id && this.mode ==2){
      this.burial.service.id = this.activateRoute.snapshot.params.id
    }
    this.servicesList()
    this.roomsList()
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      console.log(this.burial);
      
      this.burialService.create(this.burial).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha creado correctamente', 'success'
        )
        if(this.type==0){
          this.router.navigate(["burials/list"])
        }else if(this.type == 1){
          this.router.navigate(["dashboard"])
        }
        
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.burialService.update(this.burial).subscribe(data=>{
        Swal.fire(
          "Completado", 'Se ha sctualizado correctamente', 'success'
        )
        this.router.navigate(["burials/list"])
      })
    }
  }

  btnService(){
    this.router.navigate(["/services/view/"+ this.burial.service.id])
  }

  btnRoom(){
    this.router.navigate(["/rooms/view/"+ this.burial.room.num])
  }
}
