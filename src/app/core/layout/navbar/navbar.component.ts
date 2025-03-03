import { Component, computed, inject, input, Input, InputSignal, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../services/cart/cart.service';
import { MyTranslateService } from '../../services/myTranslate/my-translate.service';
import { Observable } from 'rxjs';
import { WishListService } from '../../services/wishList/wish-list.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  // @Input() isLogin:boolean=true;
  isLogin:InputSignal<boolean> = input<boolean>(true) ;
  isEnglish:InputSignal<boolean> = input<boolean>(true) ;

   readonly _authService = inject(AuthService)
  private readonly _cartService = inject(CartService)
  private readonly _orderService = inject(OrderService)
  private readonly _wishListService = inject(WishListService)
  private readonly _myTranslateService = inject(MyTranslateService)
  private readonly translateService = inject(TranslateService)


  countCart:Signal<number> = computed( ()=> this._cartService.cartNumber())
  countWish:Signal<number> = computed( ()=> this._wishListService.wishNumber())


 ngOnInit(): void {

  this._cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      console.log(res.numOfCartItems);
      this._cartService.cartNumber.set(res.numOfCartItems)
    }
  })


  this._wishListService.getLoggedUserWishList().subscribe({
    next:(res)=>{
      this._wishListService.wishNumber.set(res.count)
    }
  })
 }

 changeLang(Lang:string):void{
  this._myTranslateService.changeLang(Lang)
  console.log("Menna")

 }



 currentLang(lang:string):boolean{

  return this.translateService.currentLang === lang
 }



}
