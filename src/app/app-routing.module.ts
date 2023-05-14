import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataListComponent } from './data-list/data-list.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: 'data-list', component: DataListComponent },
  { path: 'chart', component: ChartComponent }, // Add this route
  { path: '', redirectTo: '/data-list', pathMatch: 'full' },
];

// module organizes and bundles related components.
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
