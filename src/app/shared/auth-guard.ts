import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate() {

        if (!this.authService.checkIfTokenIsNotExpired()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}