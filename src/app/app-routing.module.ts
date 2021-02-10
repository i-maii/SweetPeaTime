import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesorderComponent } from './salesorder/salesorder.component';
import { SearchflowerComponent } from './searchflower/searchflower.component';

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
    path: 'searchflower',
    component: SearchflowerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
