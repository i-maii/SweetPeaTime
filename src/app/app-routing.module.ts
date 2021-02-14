import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PromotionComponent } from './promotion/promotion.component';
import { SalesorderComponent } from './salesorder/salesorder.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'salesorder',
    component: SalesorderComponent
  },
  {
    path: 'promotion',
    component: PromotionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
