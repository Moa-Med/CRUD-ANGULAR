import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/product';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

 products : Observable<IProduct[]> =null;

  constructor( private productService : ProductService,
    private route : Router) { }

  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }

  deleteProduct(product):void{
    const result = this.productService.deleteProduct(product);
  }

  viewProduct(product):void{
    this.route.navigate(['products/view/'+product.id]);
  }

}
