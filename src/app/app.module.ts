import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlacesService } from '../services/places.service';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage } from './home/home.page';
import { HomePageModule } from './home/home.module';
import { NewPlacePageModule } from './new-place/new-place.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PlacePage } from './place/place.page';
import { AgmCoreModule } from '@agm/core';

// import { HTTP_INTERCEPTORS,HttpClientModule }    from '@angular/common/http';
import {HttpClientModule }    from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterPageModule } from 'src/app/pages/auth/register/register.module';
import { LoginPageModule } from './pages/auth/login/login.module';
import { GetUsersPageModule } from 'src/app/pages/auth/get-users/get-users.module';

import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { DevelopersPageModule } from 'src/app/pages/developers/developers.module';
import { DeveloperPageModule } from 'src/app/pages/developer/developer.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DatabaseService } from './services/database.service';
import { SQLiteMock } from 'src/app/models/sqliteMock';
import { PhotoPageModule } from 'src/app/pages/photo/photo.module';
import { Network } from '@ionic-native/network/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [PlacePage],
  imports: [BrowserModule,  HttpClientModule,FormsModule,RegisterPageModule,LoginPageModule,GetUsersPageModule,DevelopersPageModule,DeveloperPageModule,PhotoPageModule,
    ReactiveFormsModule, AgmCoreModule.forRoot({
    apiKey: 'AIzaSyCujZNNmabNoLGBgZ2OVkWZ9X-TgmfG9Cw'
  }), IonicModule.forRoot(), AppRoutingModule,HomePageModule,NewPlacePageModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    Storage,
    Geolocation,
    NativeStorage,
    SQLite,
    SQLitePorter,
    SplashScreen, 
    Network,
    AndroidPermissions,
    LocationAccuracy,
    Camera,
    File,
    Base64,
    FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    //Creating Custom Sqlite ..To Run in our Broswer

    //  { provide: SQLite, useClass: SQLiteMock},
    
    // { provide: HTTP_INTERCEPTORS, useClass: IonicRouteStrategy}
    DatabaseService
  ],
  
  bootstrap: [AppComponent]
})

export class AppModule {}


 