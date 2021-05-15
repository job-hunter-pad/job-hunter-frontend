import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.data && route.data.roles) {
            const userType = this.authService.getUserData().userType;
            if (route.data.roles.indexOf(userType) == -1) {
                this.router.navigate(['/']);
                return false;
            }
        }

        if (!this.authService.checkIfTokenIsNotExpired()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}