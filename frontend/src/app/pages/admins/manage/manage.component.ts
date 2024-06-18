import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { Headquarter } from 'src/app/model/headquarter';
import { Profile } from 'src/app/model/profile.model';
import { AdminService } from 'src/app/services/admin.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1-> view, 2-> Create, 3-> Update
  admin: Admin
  profile: Profile
  theFormGroup: FormGroup;
  trySend: boolean
  headquarters: Headquarter[]
  constructor(private activateRoute: ActivatedRoute,
              private adminService: AdminService,
              private theFormBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private headquarterService: HeadquarterService
  ){
    this.mode=1
    this.admin = {id: 0, direction:"", headquarter:{id:null, name:"", direction:"", description:"", status:0 }}
    this.profile = {name: "", last_name: "", birthday: "", number_phone:""}
    this.configFormGroup()
  }
  getAdmin(id:number){
      this.adminService.view(id).subscribe(data =>{
        this.admin = data
        this.userService.getProfile(this.admin.user_id).subscribe(data => {
          this.profile = data
        })
      })
    }

  headquartersList(){
    this.headquarterService.list().subscribe(data =>{
      this.headquarters = data
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
    if(this.activateRoute.snapshot.params.id && this.mode != 2){
      this.admin.id=this.activateRoute.snapshot.params.id
      this.getAdmin(this.admin.id)
    }else if(this.activateRoute.snapshot.params.id && this.mode == 2){
      this.admin.user_id = this.activateRoute.snapshot.params.id
    }
    this.headquartersList()
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({ 
      name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      last_name:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      birthday:['',[Validators.required]],
      number_phone:['',[Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      direction:['',[Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      idHeadquarter:[null, Validators.required]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  create(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.adminService.create(this.admin).subscribe(data=>{
        this.userService.createProfile(this.admin.user_id, this.profile).subscribe(data =>{
          Swal.fire(
            "Completado", 'Se ha creado correctamente', 'success'
          )
          this.router.navigate(["admins/list"])
        })
      })
    }
  }

  update(){
    this.trySend=true
    if(this.theFormGroup.invalid){
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    }else{
      this.adminService.update(this.admin).subscribe(data=>{
        this.userService.updateProfile(this.admin.user_id, this.profile).subscribe(data =>{
          Swal.fire(
            "Completado", 'Se ha actualizado correctamente', 'success'
          )
          this.router.navigate(["admins/list"])
        })
      })
    }
  }
}
