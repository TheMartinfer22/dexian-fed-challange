import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckGuard implements CanActivate {
  constructor(private router: Router) {}

  private redirectLogin() {
    this.router.navigate(['/']);
  }

  canActivate(): Observable<boolean> {
    const token = sessionStorage.getItem('TOKEN');
    if (!token || !token.includes('encrypted_in_en_us_token__mega_safe')) {
      this.redirectLogin();
      return new Observable<boolean>((observer) => observer.next(false));
    }
    return new Observable<boolean>((observer) => observer.next(true));
  }
}
