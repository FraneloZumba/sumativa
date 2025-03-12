import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp } from 'firebase/app'; // Importa initializeApp desde Firebase
import { environment } from './environments/environment'; // Importa el archivo de configuración

// Inicializa Firebase con la configuración del archivo environment.ts
initializeApp(environment.firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)] // Proveer las rutas
});
