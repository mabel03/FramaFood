import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { map } from 'rxjs';

export const hasRoleGuard: CanMatchFn = (route, segments):MaybeAsync<GuardResult> => {
  const router = inject(Router)
  return inject(LoginService).currentUser$.pipe(
    map((user) => {
        if(user){
          return true
        }

        return router.createUrlTree(['/login'])
      }),
  );
};
