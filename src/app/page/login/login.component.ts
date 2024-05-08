import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { FormsModule, NgForm } from "@angular/forms";
import {NgIf} from "@angular/common";
import {routes} from "../../app.routes";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {
    sessionStorage.removeItem('TOKEN');
  }
  @ViewChild('loginForm', { static: true }) loginForm!: NgForm;

  errorMessage = '';

  doLogin() {
    if (this.loginForm.valid) {
      if (this.loginForm.value.username === 'a' && this.loginForm.value.password === 'b') {
        sessionStorage.setItem('TOKEN', 'encrypted_in_en_us_token__mega_safe')
        this.router.navigate(['alunos']);
      } else {
        this.errorMessage = 'Nome de usuário ou senha inválidos';
      }
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos';
    }
  }
}
