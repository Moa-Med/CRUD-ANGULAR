import { Injectable } from '@angular/core';
import { Lookup } from '../models/lookup';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

private units:Array<Lookup>=[
  {name: 'PCS',code:"1",category:1},
  {name: 'Carton',code:"2",category:1},
  {name: 'Grace',code:"3",category:1},
  {name: 'ltr',code:"4",category:1},
];

private productCategory:Array<Lookup>=[
  {name: 'Pickleas',code:"1",category:1},
  {name: 'rice',code:"2",category:1},
  {name: 'oil',code:"3",category:1},
  {name: 'Masal',code:"4",category:1},
];

  constructor() { }

  getProductCategory(): Observable<Lookup[]>{
    return of(this.productCategory);
  }

getUnits(): Observable<Lookup[]>{
  return of(this.units);
}




}
