import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent } from '@components/layout/layout.component'
import { LoginComponent } from '@components/login/login.component'
import { ReservacionComponent } from '@components/reservacion/reservacion.component';

const routes: Routes = [
  {  path: '',
   component : LayoutComponent,
   children: [
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
     },
    {
      path: 'login',
      component: LoginComponent
     },
     {
      path: 'reservacion',
      component: ReservacionComponent
     }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
