import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{

  userInfo:any;
  userAdd:any;
  persionalEdit:boolean=false;
  addressEdit:boolean=false;
  personalFormGroup!:FormGroup;
  addressFormGroup!:FormGroup;

  constructor(private fb:FormBuilder,private userService:UserService,){}

  ngOnInit(): void { 
    var temLocal:any = localStorage.getItem('_u');
    if (localStorage.getItem('_u') !== null) {
      const tem = JSON.parse(temLocal);
      this.userInfo = tem[0]
      this.forms();
      this.getUser({mobile:tem[0].m});
      // this.patchForm();
      // console.log(this.personalFormGroup.value,this.userInfo,this.userAdd)
    }else{
      return;
    }
    
  }

  forms(){
    this.personalFormGroup=this.fb.group({
      name:[this.userInfo.n,Validators.required],
      email:[this.userInfo.e,Validators.required],
      mobile:[this.userInfo.m,Validators.required],
      type:['user',Validators.required],
    });
    // this.addressFormGroup=this.fb.group({
    //   mobile:[this.userInfo.m,Validators.required],
    //   street:['',Validators.required],
    //   city:['',Validators.required],
    //   state:['',Validators.required],
    //   postalCode:['',Validators.required],
    //   country:['',Validators.required],
    //   type:['add',Validators.required],
    // });
  }

  patchForm(){
    this.personalFormGroup.patchValue([
      {name:this.userInfo.n},
      {email:this.userInfo.e},
      {mobile:this.userInfo.m}
    ]);
  }

  getUser(data:any){
    this.userService.getUserDetail(data).subscribe((result:any)=>{
            if (result.status === true) {
              this.addressFormGroup = this.fb.group({
                mobile:[this.userInfo.m,Validators.required],
                street:[result.data.userAddress.street,Validators.required],
                city:[result.data.userAddress.city,Validators.required],
                state:[result.data.userAddress.state,Validators.required],
                postalCode:[result.data.userAddress.postalCode,Validators.required],
                country:[result.data.userAddress.country,Validators.required],
                type:['add',Validators.required],
            });
              this.userAdd=this.addressFormGroup.value;
              // console.log(this.userAdd,this.addressFormGroup.value)
            }
          })
  }

  personalSave(){
    this.userService.userUpdate(this.personalFormGroup.value).subscribe((res:any)=>{
      if (res.status===true) {
        this.getUser({mobile:this.userInfo.m});
        alert(res.message)
      }else{
        alert(res.message)
      }
    })
  }

  personal(){
    return this.persionalEdit = !this.persionalEdit;
  }

  addressSave(){
    this.userService.userUpdate(this.addressFormGroup.value).subscribe((res:any)=>{
      if (res.status===true) {
        this.getUser({mobile:this.userInfo.m});
        alert(res.message)
      }else{
        alert(res.message)
      }
    })
  }

  address(){
    return this.addressEdit = !this.addressEdit;
  }

}
