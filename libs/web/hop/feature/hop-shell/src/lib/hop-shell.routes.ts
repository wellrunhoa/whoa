import { Route } from '@angular/router';
import { AuthLayoutComponent, BasicLayoutComponent } from '@whoa/web/shared/ui/layout';
import { AuthGuard } from '@whoa/web/auth/utils';

export const HopShellRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@whoa/web/auth/feature/shell').then((m) => m.AuthShellModule)
  },
  {
    path: 'dashboard',
    component: BasicLayoutComponent,
    loadChildren: () => import('@whoa/web/hop/feature/hop-home').then((m) => m.HopHomeModule),
    canActivate: [AuthGuard]
  }
];
