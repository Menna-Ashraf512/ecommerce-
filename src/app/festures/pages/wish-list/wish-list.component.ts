import { Component, inject } from '@angular/core';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { WishList } from '../../../shared/interfaces/wish-list';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
    private readonly wishListService = inject(WishListService)

    wishList:WishList ={} as WishList
      
    ngOnInit(): void {
      this.getWishList()
    }

    getWishList():void{
      this.wishListService.getLoggedUserWishList().subscribe({
        next:(res)=>{ 
          this.wishList=res
          this.wishListService.wishNumber.set(res.count);
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }


    removeItem(id:string):void{
      this.wishListService.removeSpecificFromWishList(id).subscribe({
        next:(res)=>{
          if(res.status === "success"){
            this.getWishList();
          }
        }
      })


    }
}



