import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSalesorderComponent } from './create-salesorder/create-salesorder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PromotionComponent } from './promotion/promotion.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { LoginComponent } from './login/login.component';
import { SalesorderComponent } from './salesorder/salesorder.component';
import { AuthGuard } from './_helpers/auth.guard';
import { SearchflowerComponent } from './searchflower/searchflower.component';
import { EditSalesorderComponent } from './edit-salesorder/edit-salesorder.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'salesorder',
        component: SalesorderComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'createSalesorder',
        component: CreateSalesorderComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'editSalesorder',
        component: EditSalesorderComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent, 
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'searchflower',
        component: SearchflowerComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: PromotionComponent,
    children: [
      {
        path: 'promotion',
        component: PromotionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
