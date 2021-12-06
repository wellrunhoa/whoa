import { Route } from '@angular/router';
import { AuthLayoutComponent, BasicLayoutComponent } from '@whoa/web/core/ui/layout';
import { AuthGuard } from '@whoa/web/auth/data-access';
import { PropertyGuard } from '@whoa/web/property/data-access';

export const HopShellRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@whoa/web/auth/feature/shell').then((m) => m.AuthShellModule)
  },
  {
    path: 'property',
    component: AuthLayoutComponent,
    loadChildren: () => import('@whoa/web/property/feature/shell').then((m) => m.PropertyShellModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: BasicLayoutComponent,
    loadChildren: () => import('@whoa/web/hop/feature/hop-home').then((m) => m.HopHomeModule),
    canActivate: [AuthGuard, PropertyGuard]
    //,
    // data:{permissions:[{
    //   rsname:"hoa-board",
    //   scope:"view" 
    // }]}
  },
  {
    path: 'service-request',
    component: BasicLayoutComponent,
    loadChildren: () =>
      import('@whoa/web/service-req/feature/shell').then((m) => m.ServiceRequestShellModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reservations',
    component: BasicLayoutComponent,
    loadChildren: () =>
      import('@whoa/web/reservations/feature/shell').then((m) => m.ReservationsShellModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    component: BasicLayoutComponent,
    loadChildren: () => import('@whoa/web/payment/feature/shell').then((m) => m.PaymentShellModule),
    canActivate: [AuthGuard]
  }
];
