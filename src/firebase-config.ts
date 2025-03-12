// src/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database'; // Importar getDatabase para Realtime Database
import { environment } from './environments/environment';  // Importa las configuraciones de Firebase

// Inicializar Firebase
const app = initializeApp(environment.firebaseConfig);

// Si lo necesitas para usar Analytics
const analytics = getAnalytics(app);

// Inicializar Realtime Database
const db = getDatabase(app);

export { app, analytics, db };  
