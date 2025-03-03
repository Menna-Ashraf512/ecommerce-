import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  messageError:string=''
  messageSuccess:string=''
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
    }
  );

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            
            //1-save token
            localStorage.setItem('userToken',res.token)
            //2- decode-token
            this.authService.saveUserData();
            //3-navigate path login
            setTimeout(() => {
            this.router.navigate(['/home'])
            }, 500);
            this.messageSuccess =res.message

          }
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          // show message Error
          this.messageError=  error.error.message
          this.isLoading = false;
        },
      });
    }
  }

}
