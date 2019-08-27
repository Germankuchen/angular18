import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    console.log('Estoy en el guard');
    if (!this.authService.estaLogueado()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
