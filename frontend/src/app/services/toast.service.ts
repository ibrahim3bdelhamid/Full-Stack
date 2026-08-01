import { Injectable, signal } from '@angular/core';

interface ToastMessage{
  text: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})

export class ToastService {
  message = signal<ToastMessage | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;


  show(text: string, type: 'success' | 'error'='success', duration:number= 500) {
    if(this.timeoutId){
      clearTimeout(this.timeoutId)
    }
    this.message.set({ text, type });
    this.timeoutId = setTimeout(() => this.message.set(null), duration);
  }
}
