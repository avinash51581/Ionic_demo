import { Component, OnInit } from '@angular/core';
import { Dev, DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.page.html',
  styleUrls: ['./developer.page.scss'],
})
export class DeveloperPage implements OnInit {

  developer:Dev=null;
  skills='';
  constructor(private route:ActivatedRoute,private db:DatabaseService,private router:Router,private toast:ToastController,private loadingController:LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
          let devId=params.get('id');

          console.log("In Developer ngOnInit()" + devId);
          this.db.getDeveloper(devId).then(data=>{
                this.developer=data;
                this.skills=this.developer.skills.join(',');
          });
    });
  }

  async delete(){

    const loading = await this.loadingController.create({
      message: 'Requesting server,please wait.....',
      duration:6000
    });
    await loading.present();

    this.db.deleteDeveloper(this.developer.id).then(async (res)=>{
          //this.router.navigateByUrl('/');

          let toast = await this.toast.create({
            message: 'Record Deleted Successfully',
            duration: 4000
          });
          toast.present();


    });

    await loading.dismiss();

    this.router.navigateByUrl('/developers');

  }

  async updateDeveloper() {

    

    const loading = await this.loadingController.create({
      message: 'Requesting server,please wait.....',
      duration:2000
    });
    await loading.present();


    let skills = this.skills.split(',');
    skills = skills.map(skill => skill.trim());
    this.developer.skills = skills;
 
    this.db.updateDeveloper(this.developer).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Record Updated Successfully',
        duration: 2000
      });
      toast.present();


    });

    await loading.dismiss();

    this.router.navigateByUrl('/developers');


  }


}
