import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
import { RequestStatus } from 'src/app/models/RequestStatus';


// import { LandingPage } from '../../landing/landing.page';
// import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userRegistrationForm:FormGroup;
  requestStatus: RequestStatus;
  user:User;
  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private formBuilder:FormBuilder,
    
    
    

  ) { }
  ngOnInit() {
    this.userRegistrationForm = this.formBuilder.group({      
      firstName:[],
      lastName:[],
      email:[],
      mobile:[],
      password:[]
      
   });


  }
 
  // async loadLandingPage() {
  //   const registerModal = await this.modalController.create({
  //     component: LandingPage
  //   });
  //   return await registerModal.present();
  // }

   loadLandingPage(){
    //this.navCtrl.navigateRoot('/landing');
    this.navCtrl.navigateRoot('/landing');
  }
  


  // async loginModal() {
  //   const loginModal = await this.modalController.create({
  //     component: LoginPage,
  //   });
  //   return await loginModal.present();
  // }

  
  get formControl() {
    return this.userRegistrationForm.controls;
    
  }

  register(form: NgForm) 
  {

    
    // console.log(this.formControl.fName.value);
    // console.log(this.formControl.lName.value);
    // console.log(this.formControl.email.value);
    // console.log(this.formControl.mobile.value);
    // console.log(this.formControl.password.value);
    this.user=new User(this.userRegistrationForm.value);
    console.log(this.user);

    //Call to Registration Service
     this.authService.register(this.user)
     .subscribe(
     response => {
       var res=response;
       this.requestStatus=res.body;
       alert("User Registration Successfully");
      //  if(this.requestStatus.intStatus==1){
      //    alert("User Registration Successfully");
      //    this.navCtrl.navigateRoot('/landing');
      //  }else{
      //   alert("Registration Failed");
      //  }
      
     },
     error => {
       console.log(error);
     },
     
   );
 }



  // register(form: NgForm) {
  //    console.log(this.formControl.fName.value);
  //    console.log(this.formControl.lName.value);
  //    console.log(this.formControl.email.value);
  //    console.log(this.formControl.mobile.value);
  //    console.log(this.formControl.password.value);
  //     this.authService.register(this.user).subscribe(
  //     data => {
  //       this.authService.login(this.formControl.email.value, this.formControl.password.value)
  //       .subscribe(
  //         data => {
  //         },
  //         error => {
  //           console.log(error);
  //         },
  //         () => {
  //           //this.dismissRegister();
  //           this.navCtrl.navigateRoot('/landing');
  //         }
  //       );
  //       this.alertService.presentToast(data['message']);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
        
  //     }
  //   );
  // }


}