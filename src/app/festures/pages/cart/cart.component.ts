import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Icart } from '../../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)

  cartDetails:Icart ={} as Icart
  
ngOnInit(): void {
  this.getCart()
}
getCart():void{
  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{ 
      console.log(res.data);
      this.cartDetails=res.data
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

removeItem(id:string):void{
  this.cartService.removeSpecificCardItem(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails=res.data
      this.cartService.cartNumber.set(res.numOfCartItems)      
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

updateItem(id:string,count:number):void{
  this.cartService.updateCartProduct(id,count).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails=res.data

    },
    error:(err)=>{
      console.log(err);
    }
  })
}

clearUserCart():void{
  this.cartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res.data);
      if(res.message==='success'){
        this.cartDetails= {} as Icart
        this.cartService.cartNumber.set(0)
      }

    },
    error:(err)=>{
      console.log(err); 
    }
  })
}
}
