import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Lookup } from '../models/lookup';
import { LookupService } from '../services/lookup.service';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formgroups = this.form.group({});
  units : Observable<Lookup[]>;
  categories : Observable<Lookup[]>;
  submitted = false;


  constructor(private form : FormBuilder,
    private serviceLookup : LookupService,
    private services : ProductService,
    private route: Router ,
    private router:ActivatedRoute) { }

  ngOnInit() {
this.formgroups.addControl('id',new FormControl(''));
this.formgroups.addControl('name',new FormControl('',[Validators.required]));
this.formgroups.addControl('code',new FormControl('',[Validators.required]));
this.formgroups.addControl('unit',new FormControl('',[Validators.required]));
this.formgroups.addControl('category',new FormControl('',[Validators.required]));
this.formgroups.addControl('sale',new FormControl('',[Validators.required]));
this.formgroups.addControl('purchase',new FormControl('',[Validators.required]));

this.units=this.serviceLookup.getUnits();
this.categories=this.serviceLookup.getProductCategory();

const product$ = this.router.paramMap.pipe(
  switchMap((params: ParamMap) =>
      this.services.getProductById(Number.parseInt(params.get('id')))
    ));

    product$.subscribe(product=>{
      if(!isNullOrUndefined(product)){
        console.log(product);
        this.formgroups.get('id').setValue(product.id);
        this.formgroups.get('name').setValue(product.name);
        this.formgroups.get('code').setValue(product.code);
        this.formgroups.get('category').setValue(product.category.code);
        this.formgroups.get('unit').setValue(product.unit.code);
        this.formgroups.get('sale').setValue(product.salesRate);
        this.formgroups.get('purchase').setValue(product.purchaseRate);
      }
    })




  }

  save($event):void{
   this.submitted = true;

if(!this.formgroups.valid)
 {
   return;
 }
 this.saveForm();
 this.route.navigate(['/products']);
  }

  saveAndContinue($event):void{
    this.submitted = true;
    if(!this.formgroups.valid)
    {
      return;
    }
    this.saveForm();
  }

  private saveForm(){
  const prod = new Product();
  prod.id=this.formgroups.get('id').value;
  prod.name=this.formgroups.get('name').value;
  prod.code=this.formgroups.get('code').value;
  prod.unit=this.lookupUnitFind(this.formgroups.get('unit').value);
  prod.category=this.lookupCateFind(this.formgroups.get('category').value);
  prod.salesRate=this.formgroups.get('sale').value;
  prod.purchaseRate=this.formgroups.get('purchase').value;

   if(prod.id == 0){
    this.services.addNewProduct(prod);}
    else {
      this.services.updateProduct(prod);
         }
  }

  lookupUnitFind(code:string):Lookup { 
   var value:Lookup=null;
const v=this.units.subscribe(lookups=>
  {
    value=lookups.find(item=>item.code==code) 
  })
  v.unsubscribe();
  return value;
}

lookupCateFind(code:string):Lookup { 
  var value:Lookup=null;
const v=this.categories.subscribe(lookups=>
 {
   value=lookups.find(item=>item.code==code) 
 })
 v.unsubscribe();
 return value;
}

}