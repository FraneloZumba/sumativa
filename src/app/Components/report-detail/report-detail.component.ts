import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../Services/report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-report-detail',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  report: any = null; // Detalles del reporte
  isEditing: boolean = false; // Para controlar si se está editando o no

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    const reportId = this.route.snapshot.paramMap.get('id');
    if (reportId) {
      this.reportService.getReportById(reportId).subscribe((data) => {
        this.report = data;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  editReport(): void {
    this.isEditing = true;
  }

  saveReport(): void {
    if (this.report.id && this.report.description) {
      this.reportService.updateReport(this.report.id, this.report).then(() => {
        alert('Reporte actualizado correctamente');
        this.isEditing = false;
      }).catch((error) => {
        alert('Error al guardar el reporte: ' + error.message);
      });
    } else {
      alert('Por favor, completa los campos.');
    }
  }

  deleteReport(): void {
    if (this.report && confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
      this.reportService.deleteReport(this.report.id).then(() => {
        alert('Reporte eliminado');
        this.router.navigate(['/home']);
      }).catch((error) => {
        alert('Error al eliminar el reporte: ' + error.message);
      });
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
      console.error('Error al tomar la foto:', error);
    }
  }
}
