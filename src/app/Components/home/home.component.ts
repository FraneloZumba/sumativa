import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../Services/report.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  reports: any[] = []; // Lista de reportes

  constructor(private router: Router, private reportService: ReportService) {
    this.loadReports(); // Cargar reportes al iniciar
  }

  loadReports() {
    this.reportService.getReports().subscribe((data: any[]) => {
      this.reports = data;
    });    
  }
  
  ngOnInit() {
    this.loadReports(); // Esto asegurará que los reportes se carguen cuando el componente se inicializa
  }  

  goToNewReport() {
    this.router.navigate(['/new-report']);
  }

  viewReport(id: string) {
    this.router.navigate(['/report-detail', id]);
  }

  deleteReport(id: string) {
    this.reportService.deleteReport(id).then(() => {
      this.loadReports(); // Recargar lista después de eliminar
    });
  }
}
