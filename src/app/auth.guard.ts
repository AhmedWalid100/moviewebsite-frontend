import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService=inject(AuthService);
  const _router=inject(Router);
  if(_authService.isUserLoggedIn()){
    return true;
  }
  else{
    _router.navigate(['/login']);
    return false;
  }
  return true;
};
