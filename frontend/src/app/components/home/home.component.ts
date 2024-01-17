import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { catchError, concat, forkJoin, of } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,AfterViewInit {

  product: any;
  allProduct: any;
  category: any;
  slider: any=[];
  banner: any;
  skeleton:boolean=true;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getAll();

    setTimeout(() => {
      this.skeleton=false;
    }, 2000);
  }

  async getAll() {
    const cat = this.categoryService.getAll().pipe(catchError(e=> of(e)));
    const prod = this.productService.getAll().pipe(catchError(e=> of(e)));
    const slide = this.productService.slider().pipe(catchError(e=> of(e)));
    const ads = this.productService.ads().pipe(catchError(e=> of(e)));
    console.log(document.cookie)
    await forkJoin([cat,prod,slide, ads])
    .subscribe((res:any)=>{
      // console.log(res)
      if (res[0]) {
        this.category = res[0];
      }
      if(res[1]){
        res[0].map((item: any) => {
          res[1].forEach((prod: any, i: any) => {
            if (Number(prod.categoryId) === Number(item.id)) {
              // prod.imageUrl.replace('localhost','192.168.43.204')
              (this.product = res[1]) && (this.product[i].category = item.name) && (this.product[i].check = true);
              this.allProduct = this.product;
            }
          })
        })
        // console.log(this.product)
      }
      if (res[2]) {
        this.slider = res[2].items;
        // console.log(this.slider)
      }
      if (res[3]) {
        this.banner = res[3].data;
      }else{
        console.log("err")
      }
    });
  }

  productList(id: any) {
    this.router.navigate(['product', id]);
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  searchByCategory(c: any) {
    console.log(c)
  }
  carouselOptions:OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    items:this.slider.length,
    // navText: ['prev', 'next'],
    // nav: true,
    responsive: {
      0: {
        items: 1
      },
      // 400: {
      //   items: 2
      // },
      // 740: {
      //   items: 3
      // },
      // 940: {
      //   items: 4
      // }
    }
  }
  ngAfterViewInit(): void {
    
  }

}
