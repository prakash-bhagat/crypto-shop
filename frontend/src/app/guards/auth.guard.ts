import { CanActivateFn, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { filter } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  // console.log(authService.readToken())

  if (authService.getToken() !== null) {
    // console.log("in")
    // router.navigateByUrl('/shop')
    return true;
  } else {
    router.navigateByUrl('/signin')
    return false;
  }
};
