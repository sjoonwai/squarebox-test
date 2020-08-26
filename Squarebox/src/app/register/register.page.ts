import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  router:  Router, private http: HttpClient, private storage: Storage) { }

  firstName = ''
  lastName = ''
  email = ''
  password = ''

  ngOnInit() {
  }

  submitForm(){
    if(this.firstName == '' || this.lastName == '' || this.email == '' || this.password == ''){
      alert('Please fill in all details.')
      return;
    }
    else{
      let registerObj = { 
        "firstName": this.firstName,
        "lastName": this.lastName,
        "email": this.email,
        "password": this.password
      }

      this.http.post<any>('http://localhost:8081/register', registerObj).subscribe(data => {
          if(data.userID != null){
            this.storage.set('loggedInUserID', data.userID);
            this.router.navigate(['/', 'home'], { state: data.userID });
          }
          else{
            alert('Failed to register');
          }
      });
    }
  }

}
