import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
var loginToken = localStorage.getItem("LoginToken")
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticationState = new BehaviorSubject<boolean>(false)
  private points = new BehaviorSubject<any>('')
  // public  BASE_URL= 'http://45.79.120.216/ngo/api/web/v1'
  public  BASE_URL= 'https://www.cocoalabs.in/ngo/api/web/v1'
  loginToken: string;
  useravailable: any;
  // public  BASE_URL= 'https://www.cocoalabs.in/ngo/api/web/v1'

  constructor(private http: HttpClient,private apiService:ApiService) {
     this.loginToken = localStorage.getItem("LoginToken")
    // console.log(this.userDetails)
    if(this.loginToken){
      this.apiService.getUserProfile().subscribe(arg=>{
      this.points.next(arg['userDetails'].points)
      });

      this.authenticationState.next(true);
    }
    else{
      this.points.next('');
      this.authenticationState.next(false);
    }
   }
  checkUserisLoged(){
    if(this.loginToken){
      this.authenticationState.next(true);
    }
    else{
      this.authenticationState.next(false);
    }
  }
  getAllPoints(token){
    if(token){
    this.apiService.getUserProfileData(token).subscribe(arg=>{
      this.points.next(arg['userDetails'].points);
      console.log(arg)
      });
  }
  else{
    this.points.next('')
  }
}
isGetPoints(): Observable<boolean> {
  return this.points.asObservable();
}
  setUser(data){
    this.authenticationState.next(data);
  }
  isAuthenticated(): Observable<boolean> {
    return this.authenticationState.asObservable();
  }
  isCheckUserAuthguard(){
    return this.authenticationState;
  }
  logout(){
    if(this.loginToken){
      this.authenticationState.next(false);
    }
}


}
