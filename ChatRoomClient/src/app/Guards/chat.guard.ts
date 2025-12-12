import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const chatGuard: CanActivateFn = () => {
  const router = inject(Router);
  const nickname = sessionStorage.getItem('nickname');
  if (nickname) return true;
  else return router.createUrlTree(['/']);
};
