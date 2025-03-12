import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  // Verificación de permisos de cámara
  private async checkPermissions(): Promise<boolean> {
    const check = async (permission: PermissionStatus): Promise<boolean> => {
      if (permission.camera !== 'granted' || permission.photos !== 'granted') {
        const request = await Camera.requestPermissions();
        return request.camera === 'granted' && request.photos === 'granted';
      }
      return true;
    };

    const permissions = await Camera.checkPermissions();
    if (!(await check(permissions))) {
      throw new Error('Permisos de cámara no otorgados');
    }
    return true;
  }

  // Método para tomar la foto y guardarla en localStorage como base64
  async takePicture(): Promise<void> {
    await this.checkPermissions();
    
    // Tomar la foto y obtenerla como base64
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, // Cambié aquí a Base64
      source: CameraSource.Camera
    });

    const base64Image = image.base64String; // Esta es la cadena base64

    // Guardar la imagen en localStorage
    if (base64Image) {
      localStorage.setItem('capturedImage', base64Image);
      console.log('Imagen guardada en localStorage');
    } else {
      throw new Error('Error al tomar la foto');
    }
  }

  // Método para recuperar la imagen desde localStorage
  getStoredImage(): string | null {
    return localStorage.getItem('capturedImage');
  }
}
