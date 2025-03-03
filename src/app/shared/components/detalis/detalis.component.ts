import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-detalis',
  imports: [CarouselModule],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.scss'
})
export class DetalisComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _ProductService = inject(ProductService)
  private readonly _cartService = inject(CartService)
  isLoadingCart=false;
  detailsProduct:Product | null =null
    images!:string[]
  ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe({
        next:(p)=>{
          let idProduct = p.get('id')
          //logic api ---- call api specific
          this._ProductService.getSpecificProducts(idProduct).subscribe({
            next:(res)=>{
              this.detailsProduct=res.data
              this.images = res.data.images;
              console.log(this.detailsProduct)
            },
            error:(err)=>{
              console.log(err)
            }
          })

        }
      })


      // console.log(this.images);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }


  addCartItem(id: string): void {
    this.isLoadingCart = true;
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        // this._toastrService.success(res.message, this.product.category.name);
        this.isLoadingCart = false; 
        this._cartService.cartNumber.set(res.numOfCartItems)
      }
      })
   
}
}