import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductchildComponent } from './productchild/productchild.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { WrapperComponentComponent } from './wrapper-component/wrapper-component.component';


const routes: Routes = [
  {
    path: '',
    component: WrapperComponentComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: ProductsListComponent
      },
      {
        path: 'info',
        component: ProductchildComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }