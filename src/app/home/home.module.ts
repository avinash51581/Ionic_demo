import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import{Storage} from '@ionic/storage';
import { HomePage } from './home.page';
import { PlacePage } from '../place/place.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [HomePage,PlacePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDiZZz17Yi4SdQHVTljjYAzNLq-_84GwRo'
   }),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  providers:[]
})
export class HomePageModule {}
