import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { RegisterPage } from '../auth/register/register.page';
import { LoginPage } from '../auth/login/login.page';
// import { AuthService } from 'src/app/services/auth.service';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  
  constructor(
    
    private menu: MenuController,
    private navCtrl: NavController,
    
  ) { 
    this.menu.enable(false);
    console.log('In Consructor Landing Page');


  }

  ionViewWillEnter() {
    
  }

  ngOnInit() {
    
  }


  register(){
    this.navCtrl.navigateForward('/register');
  }

  getGeoMap(){
    this.navCtrl.navigateForward('/home');
  }

  getUsers(){
        this.navCtrl.navigateForward('/get-users');
  }

  crudPage(){
    this.navCtrl.navigateForward('/developers');
  }

  photoPage(){
    this.navCtrl.navigateForward('/photo');
  }

  async login() {
    this.navCtrl.navigateForward('/login');
  }
}