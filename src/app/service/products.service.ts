import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  // products data
  product = [
    { id: 1, name: 'Galaxy Fold', image: '../../../assets/galaxy.jpeg',price:'110' },
    { id: 2, name: 'Extension Charger', image: '../../../assets/extension-charger.jpeg',price:'80' },
    { id: 3, name: 'Car Charger', image: '../../../assets/car-charger.jpeg',price:'100' },
  ]
}
