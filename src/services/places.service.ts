import { Title } from '@angular/platform-browser';
import { ReturnStatement } from '@angular/compiler';
 import {Storage} from '@ionic/storage';
 import { Injectable } from '@angular/core';
import { place } from '../Model/place.model';


@Injectable({
    providedIn: 'root'
  })


export class PlacesService{
    private places:place[]=[];


     constructor(private storage:Storage){}
    //constructor(){}

      addPlace(place:place){
        this.places.push(place);
        console.log(this.places);
        this.storage.set('places',this.places);
    }

    getPlaces(){
         return this.storage.get('places')
        .then(
            (places)=>{
                this.places=places==null ? [] : places;
                return this.places.slice();
            }
        );
    }
}