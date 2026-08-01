import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Toast } from './components/toast/toast';
import { Modal } from './components/modal/modal';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Toast, Modal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
