import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../Services/report.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

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
      this.loadReport(reportId); // Cargar el reporte cuando el componente se inicializa
    }
  }

  // Cargar los detalles del reporte desde Firebase
  loadReport(id: string): void {
    this.reportService.getReports().subscribe((reports) => {
      this.report = reports.find((r) => r.id === id);
    });
  }

  // Regresar a la página principal
  goBack(): void {
    this.router.navigate(['/home']);
  }

  // Activar el modo de edición
  editReport(): void {
    this.isEditing = true;
  }

  // Guardar los cambios del reporte
  saveReport(): void {
    if (this.report.id && this.report.description) {
      this.reportService.addReport(this.report).then(() => {
        alert('Reporte actualizado correctamente');
        this.isEditing = false; // Desactivar el modo de edición
      }).catch((error) => {
        alert('Error al guardar el reporte: ' + error.message);
      });
    } else {
      alert('Por favor, completa los campos.');
    }
  }

  // Eliminar el reporte
  deleteReport(): void {
    if (this.report && confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
      this.reportService.deleteReport(this.report.id).then(() => {
        alert('Reporte eliminado');
        this.router.navigate(['/home']); // Redirigir a la página principal
      }).catch((error) => {
        alert('Error al eliminar el reporte: ' + error.message);
      });
    }
  }
}
