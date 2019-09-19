import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.page.html',
  styleUrls: ['./get-users.page.scss'],
})
export class GetUsersPage implements OnInit {
  userList:User[];
  constructor(public loadingController: LoadingController,private navCltr:NavController,private authService:AuthService) { }

  async downloadUserList() {
    const loading = await this.loadingController.create({
      message: 'Requesting server,please wait.....',
      
    });
    await loading.present();

     this.authService.getUsers().subscribe(response => {
       this.userList=response;
       console.log(this.userList);
       alert("Successfully Downloaded");
     },
     error => {
       console.log(error);
     },
   );
   await loading.dismiss();
    //await loading.dismiss();
  }
  
  loadLandingPage(){

    this.navCltr.navigateRoot('/landing');
  }


  ngOnInit() {
  }

}
