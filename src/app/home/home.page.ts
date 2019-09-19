import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NewPlacePage } from '../new-place/new-place.page';
import { PlacesService } from '../../services/places.service';
import { PlacePage } from '../place/place.page';
import { place } from '../../Model/place.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  places:{title:string}[]=[];
  constructor(private modelCltr:ModalController,private navCltr:NavController,private placeService:PlacesService){}
 

  //Fired when the component routing to is about to animate into view.
  ionViewWillEnter(){
    // console.log("In Home Loading");
    //this.places=this.placeService.getPlaces();
    // console.log(this.places);

    

    this.placeService.getPlaces().then(
          (places)=>this.places=places
    );

  }
  loadNewPlacePage(){
    //this.navCltr.navigateRoot('/new-place');
    this.navCltr.navigateForward('/new-place');
  }

  loadLandingPage(){
    this.navCltr.navigateRoot('/landing');
  }



  async onOpenMap(place:place) {
    console.log('In Open Modal' + place.location.lat);
    const modal = await this.modelCltr.create({
      component: PlacePage,
      componentProps: { 
        lat: place.location.lat,
        lng: place.location.lng
        //value:123
       }
      
       
    });
    return await modal.present();
  }





  onOpenMap1(){
    
    //this.modelCltr.create(TestComponent).present();

  }




}
