import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  loginToken: string;
  constructor(private authService: AuthService, private router: Router)
  {
  this.loginToken = localStorage.getItem("LoginToken")

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if(this.loginToken){
      console.log("kjhkj")
      return true;
    }
    else{
      console.log("aaaaa")

      return this.router.navigate(['/home']);
    }

  }
}
