import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
 import { ViewController } from '@ionic/core';


@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})

export class PlacePage implements OnInit {
lat;
lng;

  constructor(private navCltr:NavController ) { 
    

    //  this.lat=this.navParams.data.location.lat;
    //  this.lng=this.navParams.data.location.lng;
    
    
  }


  backToMainPage(){
    //console.log('Dismiss');
    this.navCltr.navigateForward('/home');
    //this.navCltr.navigateRoot('/home');
  }

  onDismiss() {
  }



  ngOnInit() {
    
    
    console.log(`${this.lat} ${this.lng}`)

  }

}
