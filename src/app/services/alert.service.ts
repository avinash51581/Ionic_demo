import { Injectable } from '@angular/core';
 import { ToastController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Toast, ToastController } from 'ionic-angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  

  constructor(private toastController:ToastController) { 
   
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }


   



}
