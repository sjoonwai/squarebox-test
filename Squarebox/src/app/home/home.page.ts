import { Component } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoginPageRoutingModule } from '../login/login-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userObj = { }
  userID

  constructor(private  router:  Router, private http: HttpClient, private storage: Storage) {
  }

  ionViewWillEnter(){
    this.storage.get('loggedInUserID').then((val) => {
      this.userID =  val;
      let param = new HttpParams(); 
      
      if(this.userID != null){
        param = param.append('userID', this.userID.toString());

        this.http.get<any>('http://localhost:8081/home', { params: param }).subscribe(data => {
            if(data.user != null){
              this.userObj= data.user as {
                firstName: string,
                lastName: string,
                email: string
              };
            }
        });
      }
      else{
        this.router.navigate(['/', 'login']);
      }
    });
  }

  logout(){
    this.storage.remove('loggedInUserID').then(() => {
      this.router.navigate(['/', 'login']);
    })
  }
}
