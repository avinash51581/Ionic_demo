import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../services/places.service';
//import { Geolocation } from 'ionic-native';
 import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.page.html',
  styleUrls: ['./new-place.page.scss'],
})
export class NewPlacePage implements OnInit {

  location:{lat:number,lng:number}={lat:0,lng:0};
  


  constructor(private placesService:PlacesService,private navCltr:NavController,private geolocation:Geolocation) { }

  ngOnInit() {
  }

  backToMainPage(){
    this.navCltr.navigateRoot('/home');
  }

  onAddPlace(value:{title:string})
  {
    console.log(value);
    this.placesService.addPlace({title:value.title,location:this.location});
    this.navCltr.navigateRoot('/home');
  }

  onLocateuser(){

    
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      
      this.location.lat=resp.coords.latitude;
      this.location.lng=resp.coords.longitude;
      console.log(this.location.lat);
      console.log(this.location.lng);
      alert("Location Capture Successfully");

     }).catch((error) => {
       console.log('Error Occur while processing' + error);
     });

     

  }
  

}
