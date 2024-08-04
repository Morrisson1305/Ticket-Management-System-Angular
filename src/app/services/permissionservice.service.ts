import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionserviceService {

  constructor( private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const currentUser = this.authService.currentUserValue;

    if(currentUser) {

      if(next.data['role'] && next.data['role'] !== currentUser.role) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});

    return false;
  }
}
