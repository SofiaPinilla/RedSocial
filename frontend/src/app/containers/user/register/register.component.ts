import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.register()
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.password2.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder, public userService: UserService, public router: Router, private notificationService: NzNotificationService) {}

  public message:string;
  public successMsg: string;
  public errorMsg;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      password2: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
      agree: [false]
    });
  }
  register(){
    console.log(this.validateForm.controls)
    if (this.validateForm.controls.password.errors?.pattern) {
      return this.notificationService.warning('Wrong password', 'Your password must contain at least a lowercase letter, a uppercase letter, a number, and must be between 8 and 40 characters')
    }
    if (!this.validateForm.controls.agree?.value) {
      return this.notificationService.warning('Unregistered', 'You must accept the agreement')
    }
    if(this.validateForm.valid){
      const user =this.validateForm.value;
      this.userService.signup(user)
      .subscribe(
        (res:HttpResponse<object>)=>{
          this.notificationService.success('Succesfully', res['message']);
          this.successMsg=res['message'];
          setTimeout(() => {
            this.router.navigate(['login'])
          }, 2000);
      },
      (error: HttpErrorResponse) => {
        this.notificationService.error( 'Unregistered', error.error.message) ;
         console.error(error)
      // (errors: HttpErrorResponse) => {
      //  this.notificationService.error( 'Unconnected', errors.error.message) ;
      //   console.log(errors)
      
      }
    )
    }
  }
}
