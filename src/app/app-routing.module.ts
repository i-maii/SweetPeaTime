import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSalesorderComponent } from './create-salesorder/create-salesorder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditSalesorderComponent } from './edit-salesorder/edit-salesorder.component';
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
    path: 'createSalesorder',
    component: CreateSalesorderComponent
  },
  {
    path: 'editSalesorder',
    component: EditSalesorderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
