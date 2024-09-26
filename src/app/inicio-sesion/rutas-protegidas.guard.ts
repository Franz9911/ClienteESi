import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RutasProtegidasGuard implements CanActivate {
  constructor(private loginServ:LoginService, private router:Router){}
  canActivate():boolean{
    if(this.loginServ. getIsUsuarioAutoriado()){
      return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
