import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ToastController, Platform } from '@ionic/angular';

import { AlertService } from 'src/app/services/alert.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';



declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
   photoSelectionValue:any;

   locationCoords: any;
  timetest: any;
  lastImage: string = null;
   
  image:any='';
  private chooseCameraStatus:Boolean=false;
  private chooseGalleryStatus:boolean=false;
  private isPhotoSelectionDisabled:boolean=false;
  private networkState:string;
  private ishidden=false;
  constructor(private network:Network,private toast:ToastController,private alertService:AlertService,private androidPermissions: AndroidPermissions,private geolocation: Geolocation,private locationAccuracy: LocationAccuracy,private camera:Camera,private file:File,private base64:Base64,private platform:Platform,private filePath:FilePath) {

    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timetest = Date.now();
  }

  ngOnInit() {
  }

  takePhotoFromCamera(){
    
    this.checkGPSPermission();

    let isNetworkStatusAvailable= this.checkNetworkConnectivity();
    if(!isNetworkStatusAvailable){
      this.alertService.presentToast("User is offline,please check network connectivity");
      return;
    }

    let base64ImageData;  
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA  
    }

    //Open Camera
    this.camera.getPicture(options).then((imagePath ) => {
      this.image=(<any>window).Ionic.WebView.convertFileSrc(imagePath ); 
        this.ishidden=true;
        this.platform.ready().then(() =>{
              this.file.checkDir(this.file.externalRootDirectory, 'NabardImages').then(response => {
                console.log('Directory exists'+response);
                this.getCurrentImagePathAndName(imagePath,this.photoSelectionValue);
              }).catch(err => {
                console.log('Directory doesn\'t exist'+JSON.stringify(err));
                this.file.createDir(this.file.externalRootDirectory, 'NabardImages', false).then(response => {
                  console.log('Directory create'+response);
                  this.getCurrentImagePathAndName(imagePath,this.photoSelectionValue);
                }).catch(err => {
                  this.alertService.presentToast("Unable to capture image,please try again");
                  console.log('Directory no create'+JSON.stringify(err));
                }); 
              });
        });
      }, (err) => {
            this.alertService.presentToast("Unable to capture image,please try again");
      });

  }

  takePhotoFromGallery(){
    console.log("using Gallery" + this.photoSelectionValue);
    let base64ImageData;  
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY  
    }

    //Open Gallery
    this.camera.getPicture(options).then((imagePath ) => {
    this.image=(<any>window).Ionic.WebView.convertFileSrc(imagePath ); 
    this.ishidden=true;
      this.platform.ready().then(() =>{
            this.file.checkDir(this.file.externalRootDirectory, 'NabardImages').then(response => {
              console.log('Directory exists'+response);
              this.getCurrentImagePathAndName(imagePath,this.photoSelectionValue);
            }).catch(err => {
              console.log('Directory doesn\'t exist'+JSON.stringify(err));
              this.file.createDir(this.file.externalRootDirectory, 'NabardImages', false).then(response => {
                console.log('Directory create'+response);
                this.getCurrentImagePathAndName(imagePath,this.photoSelectionValue);
              }).catch(err => {
                this.alertService.presentToast("Unable to select image,please try again");
                console.log('Directory no create'+JSON.stringify(err));
              }); 
            });
      });
    }, (err) => {
          this.alertService.presentToast("Unable to select image,please try again");
    });


  }

  //Get Current Image Path
  public getCurrentImagePathAndName(imagePath:any,photoSelectionValue:any){
    console.log("In getCurrentImagePathAndName" + imagePath);
    let filePath1 = this.file.externalRootDirectory + "NabardImages"; 

       this.filePath.resolveNativePath(imagePath).then(filePath=>{
        if(photoSelectionValue=="G"){
          let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          console.log("currentName" + currentName);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          console.log("correctPath" + correctPath);
          this.file.moveFile(correctPath,currentName,filePath1,currentName);
        }else{
          let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          console.log("currentName" + currentName);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          console.log("correctPath" + correctPath);
          this.file.moveFile(correctPath,currentName,filePath1,currentName);
        }
        this.alertService.presentToast("Image Saved Successfully");
      }).catch(err => {
        this.alertService.presentToast("Unable to save image,please try again");
      }); 
    
  }


    //Check if application having GPS access permission  
    checkGPSPermission() {
      console.log("In checkGPSPermission");
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
        result => {
          console.log("Result" + result);
          if (result.hasPermission) {
   
            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {
   
            //If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        err => {
          alert(err);
        }
      );
    }

    requestGPSPermission() {

      console.log("In requestGPSPermission");
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          console.log("4" +canRequest);
        } else {
          //Show 'GPS Permission Request' dialogue
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
            .then(
              () => {
                // call method to turn on GPS
                this.askToTurnOnGPS();
              },
              error => {
                //Show alert if user click on 'No Thanks'
                alert('GPS is OFF,please turn ON gps');
              }
            );
        }
      });
    }
  
    askToTurnOnGPS() {

      console.log("In askToTurnGPS");      

      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          this.getLocationCoordinates()
        },
        error =>  alert('GPS is OFF,please turn ON gps')
      );
    }

 // Methos to get device accurate coordinates using device GPS
 getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
    this.locationCoords.latitude = resp.coords.latitude;
    this.locationCoords.longitude = resp.coords.longitude;
    this.locationCoords.accuracy = resp.coords.accuracy;
    this.locationCoords.timestamp = resp.timestamp;
  }).catch((error) => {
    alert('Error getting location' + error);
  });
}




  checkNetworkConnectivity(){
    this.networkState = navigator.connection.type;
    let status;
    if(this.networkState === 'none' || this.networkState === 'NONE'){
      status = false;
    }else {
      status = true;
    }
    return status;
    

}

 

  onSelectPhoto($event){
    this.isPhotoSelectionDisabled=true;

    let isNetworkStatusAvailable= this.checkNetworkConnectivity();
    if(!isNetworkStatusAvailable){
      this.alertService.presentToast("User is offline,please check network connectivity");
      return;
    }
     this.photoSelectionValue=$event.target.value;
      if(this.photoSelectionValue=="C"){
          this.chooseCameraStatus=true; 
          this.chooseGalleryStatus=false; 
      }else if(this.photoSelectionValue=="G"){
        this.chooseGalleryStatus=true; 
        this.chooseCameraStatus=false; 
      }

    

    }

}
