import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Agrega FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.router.navigate(['/home']); // Navegar a la página de inicio
    }).catch(error => {
      this.errorMessage = error.message;
    });
  }

  goToRegister() {
    this.router.navigate(['/register']); // Navega a la página de registro
  }
}
