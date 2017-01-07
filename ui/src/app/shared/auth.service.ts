import { Injectable } from "@angular/core";

import { User } from "./user.interface";
import { Router } from "@angular/router";
import {Http, Response, Headers} from "@angular/http";

@Injectable()
export class AuthService {

  isUserAuthenticated: boolean = false;
  userPrincipal: any;

  constructor(private router: Router, private http: Http) {}

  signupUser(user: User) {
    // TODO: if signUP OK then
    // this.router.navigate([ 'protected' ]);
  }

  getAuthorizationHeaders(user: User): Headers {
    return  new Headers({'authorization': 'Basic ' + btoa(user.email + ":" + user.password)});
  }


  signinUser(user: User) {
    let headers = this.getAuthorizationHeaders(user);
    this.http.get("http://localhost:8080/user", {
      headers: headers
    })
      .map(
        (response: Response) => response.json())
      .subscribe(
        (data: any) => {
          this.isUserAuthenticated = data ? true : false;
          this.userPrincipal = data;
        }
      );
  }


  logout() {
    this.isUserAuthenticated = false;
    this.userPrincipal = null;
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.isUserAuthenticated;
  }

  getUser() {
    var user = null;
    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
