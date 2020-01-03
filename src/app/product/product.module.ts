import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [ListComponent, AddComponent, ViewComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
