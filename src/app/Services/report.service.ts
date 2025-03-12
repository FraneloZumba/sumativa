import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { db } from '../../firebase-config';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportsCollection = collection(db, 'reports'); // Colección 'reports' en Firestore

  constructor() {}

  // Obtener todos los reportes desde Firestore
  getReports(): Observable<any[]> {
    return from(getDocs(this.reportsCollection).then((querySnapshot) => {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }));
  }

  // Obtener un solo reporte por ID desde Firestore
  getReportById(id: string): Observable<any> {
    return from(getDoc(doc(db, 'reports', id)).then(docSnapshot => {
      return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
    }));
  }

  // Agregar un nuevo reporte a Firestore
  addReport(report: any): Promise<void> {
    return addDoc(this.reportsCollection, report).then(() => {});
  }

  // Actualizar un reporte en Firestore
  updateReport(id: string, updatedData: any): Promise<void> {
    return updateDoc(doc(db, 'reports', id), updatedData);
  }

  // Eliminar un reporte de Firestore
  deleteReport(id: string): Promise<void> {
    return deleteDoc(doc(db, 'reports', id));
  }
}
