import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module"
import {ProductRoutingModule} from "./product-routing.module"
import { WrapperComponentComponent } from './wrapper-component/wrapper-component.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product.component';
import { ProductchildComponent } from './productchild/productchild.component';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [WrapperComponentComponent,ProductsListComponent,ProductComponent,ProductchildComponent],
  imports: [
    CommonModule,ProductRoutingModule,MaterialModule,ReactiveFormsModule,FormsModule,   HttpClientModule,

  ]
})
export class ProductModule { }
