import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  loader:boolean=false;
  payloader:boolean=false;

  constructor(private authService:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private userService:UserService){}

  ngOnInit(): void {
      this.forms();
  }

  forms(){
    this.loginForm = this.fb.group({
      mobile:['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      password:['',Validators.required]
    })
  }

  signin() {
    if (this.loginForm.valid) {
      const { mobile, password } = this.loginForm.value;
      this.loader=true;
      this.payloader=true;
      // setTimeout(() => {
        this.authService.login(this.loginForm.value)
        this.authService.isAuthGetView().subscribe((res:any)=>{
          // console.log(res)
          if (res === true) {
            this.router.navigate(['/shop']);
              this.loader=false;
              this.payloader=false;
          } else {
            this.router.navigate(['/signin']);
            this.payloader=false;
          }
        })
      // this.authService.isAuth().subscribe((res:any)=>{
      //   console.log(res)
      //   if(res.status === 'true'){
      //     // this.router.navigate([`/shop`]);
      //     // this.userService.getUserDetail({mobile:mobile}).subscribe((result:any)=>{
      //     //   if (result) {
      //         // console.log(result)
      //         // var obj:any =[{
      //         //   e:result[0].email,
      //         //   m:result[0].mobile,
      //         //   n:result[0].name
      //         // }]
      //         // localStorage.setItem('_u',JSON.stringify(obj));
      //         // window.location.reload();
      //         // window.location.href='/shop'
      //         this.router.navigate(['/shop']);
      //         this.loader=false;
      //     //   }
      //     // })
      //   }else{
      //     this.router.navigate(['/signin']);
      //   }
      // });
      // }, 2000);
    }
  }

}
