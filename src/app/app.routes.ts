import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { NewReportComponent } from './Components/new-report/new-report.component';
import { ReportListComponent } from './Components/report-list/report-list.component';
import { ReportDetailComponent } from './Components/report-detail/report-detail.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { CameraComponent } from './Components/camera/camera.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-report', component: NewReportComponent },
  { path: 'report-list', component: ReportListComponent },
  { path: 'report-detail/:id', component: ReportDetailComponent }, // Con parámetro dinámico para el ID del reporte
  { path: 'settings', component: SettingsComponent },
  { path: 'camera', component: CameraComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
