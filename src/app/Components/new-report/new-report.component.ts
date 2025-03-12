import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; 
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
    imageUrl: '',
    date: new Date().toISOString(),
    status: 'Activo',
    user: 'Usuario Actual',
  };

  constructor(private router: Router, private reportService: ReportService) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  saveReport() {
    if (this.report.description) {
      this.reportService.addReport(this.report)
        .then(() => {
          alert('Reporte guardado con éxito');
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          alert('Error al guardar el reporte: ' + error.message);
        });
    } else {
      alert('Por favor completa la descripción.');
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
      });

      if (image.dataUrl) {
        this.report.imageUrl = image.dataUrl;
      }
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  }
}
