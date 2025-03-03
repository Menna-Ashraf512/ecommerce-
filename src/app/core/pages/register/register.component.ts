import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder)
  isLoading: boolean = false;
  messageError: string = '';
  messageSuccess: string = '';
  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(30),
  //     ]),
  //     email: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  //     ]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     rePassword: new FormControl(null, [Validators.required]),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   { validators: this.confirmPassword }
  // );

  
  registerForm:FormGroup= this._formBuilder.group({
    name:[null,[ Validators.required,Validators.minLength(3),Validators.maxLength(30),]],
    email:[null, [ Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),]],
    password:[null,[ Validators.required,  Validators.pattern(/^\w{6,}$/),]],
    rePassword:[null,[Validators.required]],
    phone:[null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/),]],
  },{ validators: this.confirmPassword })
 
  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            //navigate path login
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
            this.messageSuccess = res.message;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          // show message Error
          this.messageError = error.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }
}
