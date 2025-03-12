import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], // Agrega FormsModule aquí
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password).then(() => {
      this.router.navigate(['/login']); // Navegar a la página de login después de registrarse
    }).catch(error => {
      this.errorMessage = error.message;
    });
  }

  goToLogin() {
    this.router.navigate(['/login']); // Navega a la página de registro
  }
}
