import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importar la cámara
import { ReportService } from '../../Services/report.service'; 

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
    imageUrl: 'https://images.placeholders.dev/', // Imagen inicial
    date: new Date().toLocaleString(),
    status: 'Activo',
    user: 'Usuario Actual',
  };

  constructor(private router: Router, private reportService: ReportService) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  saveReport() {
    if (this.report.id && this.report.description) {
      this.reportService.addReport(this.report)
        .then(() => {
          alert('Reporte guardado con éxito');
          this.router.navigate(['/home']);
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

  // Función para abrir la cámara y capturar la foto
// Función para abrir la cámara y capturar la foto
async takePhoto() {
  try {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera, // Usamos la cámara
      quality: 100, // Calidad de la foto
    });

    // Verificar que image.dataUrl no sea undefined
    if (image.dataUrl) {
      this.report.imageUrl = image.dataUrl;
      localStorage.setItem('lastPhoto', image.dataUrl);
    } else {
      console.error('No se pudo obtener la imagen.');
    }
  } catch (error) {
    console.error("Error al tomar la foto:", error);
  }
}
}
