import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  itemId:any;
  product:any;
  category:any;
  inCartText:string='';
  inCartStatus:boolean=false;

  constructor(
    private route:ActivatedRoute,
    private productService:ProductsService,
    private categoryService:CategoryService,
    private cartService:CartService,
    ){}

  ngOnInit(): void {
      this.getId();
      this.cartCheck()
  }
  
  getId(){
    this.route.params.subscribe((params) => {
      this.itemId = +params['id'];
      this.loadItemDetails();
    });
  }

  loadItemDetails(){
    // category
    this.categoryService.getAll().subscribe((res)=>{
      this.category=res;
    },
    (err)=>{
      console.log('Error',err)
    })

    // product
    this.productService.singleProduct(this.itemId).subscribe((res)=>{
      this.category.find((item:any)=>{
        // this.category.forEach((prod:any,i:any)=>{
          if(Number(res.categoryId) === Number(item.id)){
            (this.product=res) && (this.product.category=item.name);
            this.cartCheck();
          }
          // console.log(this.product)
        // })
      })
      // this.product=res;      
    },(err)=>{
      console.error('Error',err)
    })
  }

  addToCart(product: any): void {
    // this.cartService.addToCart(product);
  }
  cartCheck(){
    const cartItems =this.cartService.getCart();
    console.log(cartItems,this.product)
    if(cartItems){
      cartItems.forEach((c:any)=>{
        if(c.id === this.product?.id){
          this.inCartStatus =true;
          this.inCartText = 'Already added';
        }
      })
    }
  }

}
