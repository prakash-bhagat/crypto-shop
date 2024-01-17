import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  payloader:boolean=false;

  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private alertService:AlertService,
    private router:Router){}

  ngOnInit(): void {
      this.forms();
  }

  forms(){
    this.registerForm = this.fb.group({
      name:['',Validators.required],
      mobile:['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      password:['',Validators.required],
      confirmp:['',Validators.required]
    },{
      // validator: this.passwordMatchValidator,
    });
  }

  register(){
    // console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.payloader=true;
      const { mobile, password } = this.registerForm.value;

      this.authService.signup(this.registerForm.value).subscribe((res) => {
        if (res.status == true) {
          this.alertService.success(res.message)
          .then(result=>{
            this.router.navigateByUrl('/signin')
            this.payloader=false;
          })
          // localStorage.setItem('token',res.token)
        } else {
          this.alertService.success(res.message);
          this.payloader=false;
        }
      },(err)=>{
        this.alertService.success('Error while registering')
        this.payloader=false;
      });
  }else{
    this.alertService.success('Incorrect details');
  }
  }

}
