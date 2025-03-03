import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: Product;

  private readonly _cartService = inject(CartService);
  private readonly _wishListService = inject(WishListService);
  private readonly _toastrService = inject(ToastrService);

  isLoadingCart = false;
  isLoadingWish = false;
  wishListIds: string[] = [];

  ngOnInit() {
    this._wishListService.getLoggedUserWishList().subscribe((res) => {
      if (res && res.data && Array.isArray(res.data)) {
        this.wishListIds = res.data.map((item: any) => item._id);
      }
    });
  }

  addCartItem(id: string): void {
    this.isLoadingCart = true;
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._toastrService.success(res.message, this.product.category.name);
        this._cartService.cartNumber.set(res.numOfCartItems);
      },
      error: () => this._toastrService.error('Failed to add to cart'),
      complete: () => (this.isLoadingCart = false),
    });
  }

  toggleWishItem(id: string): void {
    this.isLoadingWish = true;

    if (this.wishListIds.includes(id)) {
      // Remove from wishlist
      this._wishListService.removeSpecificFromWishList(id).subscribe({
        next: (res) => {
          this._toastrService.info(res.message, this.product.category.name);
          this._wishListService.wishNumber.set(res.data.length);
          this.wishListIds = this.wishListIds.filter(wishId => wishId !== id); 
        },
        error: () => this._toastrService.error('Failed to remove from wishlist'),
        complete: () => (this.isLoadingWish = false),
      });
    } else {
      // Add to wishlist
      this._wishListService.addProductToWishList(id).subscribe({
        next: (res) => {
          this._toastrService.success(res.message, this.product.category.name);
          this._wishListService.wishNumber.set(res.data.length);
          this.wishListIds = [id];
        },
        error: () => this._toastrService.error('Failed to add to wishlist'),
        complete: () => (this.isLoadingWish = false),
      });
    }
  }
}
