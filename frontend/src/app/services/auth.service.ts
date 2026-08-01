import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(HttpClient)

  register(data:any){
    return this.api.post("http://localhost:3000/users/signup", data)
  }

  logIn(data:any){
    return this.api.post("http://localhost:3000/users/login", data)
  }

  verify(data:any){
    return this.api.post("http://localhost:3000/users/verify", data)
  }

}
