import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { NewReportComponent } from './Components/new-report/new-report.component';
import { ReportDetailComponent } from './Components/report-detail/report-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-report', component: NewReportComponent },
  { path: 'report-detail/:id', component: ReportDetailComponent }, // Con parámetro dinámico para el ID del reporte
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
