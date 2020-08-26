import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  router:  Router, private http: HttpClient, private storage: Storage) { }
  
  loginObj = {}

  ngOnInit() {
  }

  submitForm(){
    this.http.post<any>('http://localhost:8081/login', this.loginObj).subscribe(data => {
        if(data.userID != null){
          this.storage.set('loggedInUserID', data.userID);
          this.router.navigate(['/', 'home']);
        }
        else{
          alert('Failed to login');
        }
    });
  }

}
