import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@whoa/web/auth/feature/login';
import { SettingsComponent } from '@whoa/web/auth/feature/settings';

const routes: Routes = [
  // passport

  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login', titleI18n: 'app.login.login' }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: 'Settings', titleI18n: 'app.profile.settings' }
  }
  //   {
  //     path: 'register',
  //     component: UserRegisterComponent,
  //     data: { title: 'Register', titleI18n: 'app.register.register' }
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
