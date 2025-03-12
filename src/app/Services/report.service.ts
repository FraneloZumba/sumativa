import { Injectable } from '@angular/core';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { Observable, from } from 'rxjs';  // Asegúrate de importar Observable y from
import { db } from '../../firebase-config'; // Desde la raíz del proyecto

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private db = db; // Usar la instancia de la base de datos exportada

  // Obtener todos los reportes desde Firebase
  getReports(): Observable<any[]> {
    return from(get(ref(this.db, 'reports')).then((snapshot) => {
      return snapshot.exists() ? Object.values(snapshot.val()) : [];  // Si existen datos, devolverlos
    }));
  }

  // Agregar un nuevo reporte a Firebase
  addReport(report: any): Promise<void> {
    const newReportRef = ref(this.db, `reports/${report.id}`);
    return set(newReportRef, report);  // Guardar el reporte en Firebase
  }

  // Eliminar un reporte de Firebase
  deleteReport(id: string): Promise<void> {
    return remove(ref(this.db, `reports/${id}`));  // Eliminar el reporte de Firebase
  }
}
