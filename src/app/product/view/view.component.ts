import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProduct } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

product$: Observable<IProduct>;

  constructor(private route : ActivatedRoute,
    private proService : ProductService,
    private router:Router) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap( (params :ParamMap)=>
      this.proService.getProductById(Number.parseInt(params.get('id')))
      ));
  }

  editProduct(product:IProduct):void{
      
    this.product$.subscribe(product =>{
      this.router.navigate(['products/edit/'+product.id]);
    });
}


}
