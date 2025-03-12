import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { ReportService } from '../../Services/report.service'; // Importar el servicio

@Component({
  selector: 'app-new-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent {
  report = {
    id: '',
    description: '',
    imageUrl: 'https://images.placeholders.dev/',
    date: new Date().toLocaleString(),
    status: 'Activo',
    user: 'Usuario Actual',
  };

  constructor(private router: Router, private reportService: ReportService) {}

  // Función para regresar al home
  goBack() {
    this.router.navigate(['/home']);
  }

  // Función para guardar el reporte
  saveReport() {
    if (this.report.id && this.report.description) {
      this.reportService.addReport(this.report)
        .then(() => {
          alert('Reporte guardado con éxito');
          this.router.navigate(['/home']); // Regresar al home después de guardar
        })
        .catch((error) => {
          alert('Hubo un error al guardar el reporte: ' + error.message);
        });

      // Limpiar los campos después de guardar
      this.report = {
        id: '',
        description: '',
        imageUrl: 'https://images.placeholders.dev/',
        date: new Date().toLocaleString(),
        status: 'Activo',
        user: 'Usuario Actual',
      };
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
