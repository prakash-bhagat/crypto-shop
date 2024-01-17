import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  product:any;
  allProduct:any;
  // filterProduct:any;
  category:any;
  filteredProduct:any=[];
  minPrice: number = 0;
  maxPrice: number = 999;
  skeleton:boolean = true;

  constructor(
    private productService:ProductsService,
    private categoryService:CategoryService,
    private router: Router,
    private cartService: CartService,
    public sortService:SortService,
  ){}

  ngOnInit(): void {
      this.getAll();
      setTimeout(() => {
        this.skeleton=false;
      }, 2000);
  }

 async getAll(){
    // category
     await this.categoryService.getAll().subscribe((res)=>{
      res.forEach((c:any,i:any)=>{
        (this.category=res) && (this.category[i].selected=true)
      });
    },
    (err)=>{
      console.log('Error',err)
    })

    // product
    await this.productService.getAll().subscribe((res)=>{
      this.category.forEach((item:any)=>{
        res.forEach((prod:any,i:any)=>{
          if(Number(prod.categoryId) === Number(item.id)){
            (this.product=res) && (this.product[i].category=item.name) && (this.product[i].check=false);
            this.allProduct=this.product;
            // this.filterProduct =this.product;
          }
        })
      })  
    },(err)=>{
      console.error('Error',err)
    })
  }

  productList(id:any){
    this.router.navigate(['product', id]);
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
  removeFromCart(value:any){
    const arr=this.cartService.getCart();
    // console.log(value.id);
    this.cartService.removeFromCart(arr,'id',value.id);
  }

  sorting(event:any,prod:any){
    this.product=this.sortService.sort(event,prod);
  }

  toggleCheckbox(event:any) {
    const id = event.target.value;
    const isChecked = event.target.checked;
    
      if(Boolean(isChecked) === true){
        this.allProduct.filter((p:any)=>{
          if (Number(p.categoryId) === Number(id)) {
            this.filteredProduct.push(p);
            this.product =this.filteredProduct;
          }
        });
      }else if(Boolean(isChecked) === false){
        this.filteredProduct.filter((p:any)=>{
          if (Number(p.categoryId) === Number(id)) {
            const index = this.filteredProduct.indexOf(p);
            if (index > -1) { // only splice array when item is found
              this.filteredProduct.splice(index, 1); // 2nd parameter means remove one item only
              this.product = this.filteredProduct
            }
          }
        })
        if (this.filteredProduct.length === 0) {this.product = this.allProduct;}
      }

  }

  priceFilter() {
    console.log(Number(this.minPrice),Number(this.maxPrice))
    this.product = this.allProduct.filter((item:any) => Number(item.price) >= Number(this.minPrice) && Number(item.price) <= Number(this.maxPrice));
  }

  sidemenu:boolean = false;
  sideMenu(){ console.log(this.sidemenu)
    return this.sidemenu = !this.sidemenu
  }

}
