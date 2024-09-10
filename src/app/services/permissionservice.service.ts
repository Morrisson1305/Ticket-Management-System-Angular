// import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
// import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class PermissionserviceService {

//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const currentUser = this.authService.currentUserValue;

//     // Allow access to login and register routes even if the user is not authenticated
//     const isAuthRoute = state.url.includes('login') || state.url.includes('register');
//     if (!currentUser && isAuthRoute) {
//       return true; // Unauthenticated users can access these routes
//     }

//     // If user is authenticated
//     if (currentUser) {
//       // Check if the route requires a specific role
//       if (next.data['role'] && next.data['role'] !== currentUser.role) {
//         this.router.navigate(['/access-denied']); // Redirect if the role does not match
//         return false;
//       }
//       return true; // Allow access if authenticated and role is valid
//     }

//     // Redirect to login page if not authenticated and trying to access protected routes
//     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// }
