import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

    private readonly _formBuilder = inject(FormBuilder)
    private readonly _authService = inject(AuthService)
    private readonly _router = inject(Router)

    isLoading: boolean = false;
    messageError:string=''
    messageSuccess:string=''
    step:number=1;

  verifyEmail:FormGroup =this._formBuilder.group({
    email:[null, [ Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),]],


  })

  verifyCode:FormGroup =this._formBuilder.group({
    resetCode:[null, [ Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    
  })

  resetPassword:FormGroup =this._formBuilder.group({
    email:[null, [ Validators.required, Validators.email]],
    newPassword:[null,[ Validators.required,  Validators.pattern(/^\w{6,}$/),]],
  })




  emailSubmit(): void {
   let emailValue= this.verifyEmail.get('email')?.value
   this.resetPassword.get('email')?.patchValue(emailValue)
    this._authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.statusMsg==='success'){
          this.step=2
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
      

  }
  codeSubmit(): void {
      
    this._authService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status==='Success'){
          this.step=3
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  restPassSubmit(): void {
    this._authService.setResetPass(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res)
        localStorage.setItem('userToken',res.token)
        this._authService.saveUserData()
        this._router.navigate(['/home'])

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


}
