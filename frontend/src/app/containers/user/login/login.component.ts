import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public message:string;
  public successMsg: string;
  public errorMsg;

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.login()
  }
  constructor(private fb: FormBuilder,public userService:UserService, public router: Router,private notificationService: NzNotificationService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  login(){
      const user =this.validateForm.value;
      this.userService.login(user)
      .subscribe(
        (res:HttpResponse<object>)=>{
          this.notificationService.success('Conected', res['message'])
         
          const admins =['superAdmin','admin','dios'];
      
          this.userService.setUser(res['user']);
         
          this.userService.setToken(res['token']);
        
          localStorage.setItem('authToken',res['token']);
          
          setTimeout(() => this.router.navigate(['home']) , 1500);
          
      },
      (error: HttpErrorResponse) => {
       this.notificationService.error( 'Unconnected', error.error.message) ;
        console.log(error)
      
      }
      )
    }
}
