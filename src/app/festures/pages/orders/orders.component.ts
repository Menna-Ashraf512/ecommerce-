import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../../../core/services/order/order.service';
import { Ishipping } from '../../interfaces/orderData/ishipping';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Product } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-orders',
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  
  private readonly _orderService= inject(OrderService)
  private readonly _authService=inject(AuthService)  
  private readonly PLATFORM_ID=inject(PLATFORM_ID)
  Allorders!:Ishipping []
 


ngOnInit(): void {
  this.getAllOrders()
}

  getAllOrders():void{
    if(isPlatformBrowser(this.PLATFORM_ID)){
      const userId =  localStorage.getItem('userId') as string
        this._orderService.getUserOrders(userId).subscribe({
          next:(res)=>{
            console.log(res);
            this.Allorders = res.sort(
              (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
        })
    }
  }
  
}
