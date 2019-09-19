import { Component, OnInit } from '@angular/core';
import { DatabaseService, Dev } from '../../services/database.service';

import { Observable } from 'rxjs';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.page.html',
  styleUrls: ['./developers.page.scss'],
})
export class DevelopersPage implements OnInit {

  developers: Dev[] = [];
  products: Observable<any[]>;
  developer = {};
  product = {};
  selectedView = 'devs';
  private sqliteObject: SQLiteObject;
  private count:Number;

 
  

  constructor(private db:DatabaseService,private navCltr:NavController,private platform:Platform,private route:Router,private loadingController:LoadingController) { }


  ngOnInit() 
  {
    this.db.getDatabaseState().subscribe(ready=>{
      if(ready){
        this.db.getDevs().subscribe(devs=>{
          console.log('devs changed',devs);
          this.developers=devs;
        });

        this.products=this.db.getProducts();
      }
    })
   }

   loadLandingPage()
   {
        this.navCltr.navigateRoot('/landing');
   }

   getDeveloperDetail(id){
     console.log(id);
     //this.navCltr.navigateRoot('/developer');
     
     this.route.navigate(['developer',{id}]);

   }



  async addDeveloper() {

    const loading = await this.loadingController.create({
      message: 'Requesting server,please wait.....',
      duration:6000
    });
    await loading.present();

    let skills = this.developer['skills'].split(',');
    skills = skills.map(skill => skill.trim());
    this.db.addDeveloper(this.developer['name'], skills, this.developer['img'])
    .then(_ => {
          this.developer = {};
    });

    await loading.dismiss();

  }

    async addProduct() {
      const loading = await this.loadingController.create({
        message: 'Requesting server,please wait.....',
        duration:6000
      });
      await loading.present();

    this.db.addProduct(this.product['name'], this.product['creator'])
    .then(_ => {
      this.product = {};
    });

    await loading.dismiss();
  }

}
