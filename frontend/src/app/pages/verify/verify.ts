import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule],
  templateUrl: './verify.html',
  styleUrl: './verify.css',
})
export class Verify implements OnInit {
  private _authService = inject(AuthService)
  private _toastService = inject(ToastService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  errorMessage = signal<string | null>(null);

  verifyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    // Pre-fill the email if it was passed from the register page.
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.verifyForm.patchValue({ email });
    }
  }

  submitForm(){
    if(this.verifyForm.valid){
      this._authService.verify(this.verifyForm.value).subscribe({
        next:(res:any) =>{
          // The backend always responds with HTTP 200, even on failure —
          // the real outcome is in `msg`, so it must be checked here.
          if (res.msg !== "Account verified successfully") {
            this.errorMessage.set(res.msg || 'Something went wrong on our end — please try again');
            return;
          }
          this._toastService.show('Account verified! You can log in now', 'success', 2000)
          this.router.navigate(['/login'])
        },error:(err)=>{
          this.errorMessage.set(err.error?.message || 'Something went wrong on our end — please try again');
        }
      })
    }
  }
}
