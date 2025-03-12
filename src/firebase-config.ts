// src/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore'; // Firestore en vez de Realtime Database
import { environment } from './environments/environment';

// Inicializar Firebase
const app = initializeApp(environment.firebaseConfig);

// Si necesitas usar Analytics
const analytics = getAnalytics(app);

// Inicializar Firestore
const db = getFirestore(app);

export { app, analytics, db };
