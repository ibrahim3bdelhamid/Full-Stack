import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private _authService = inject(AuthService)
  private _toastService = inject(ToastService)
  private router = inject(Router)

  errorMessage = signal<string | null>(null);

  register = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    age: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  submitForm(){
    if(this.register.valid){
      this._authService.register(this.register.value).subscribe({
        next:(res:any) =>{
          // The backend always responds with HTTP 200, even when the email
          // is already registered — it puts that outcome in `message`
          // instead of an HTTP error status, so it must be checked here.
          if (res.message !== "User registered successfully") {
            this.errorMessage.set(res.message || 'Something went wrong on our end — please try again');
            return;
          }
          this._toastService.show('Check your inbox to varify your email', 'success', 4000)
          this.router.navigate(['/verify'], { queryParams: { email: this.register.value.email } })
        },error:(err)=>{
          this.errorMessage.set(err.error?.message || 'Something went wrong on our end — please try again');
        }
      })
    }
  }
}
