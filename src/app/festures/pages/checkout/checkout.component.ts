import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../core/services/order/order.service';
import { Ishipping } from '../../interfaces/orderData/ishipping';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _orderService = inject(OrderService);
  private readonly _router = inject(Router)
  private readonly _cartService = inject(CartService)
  cartId: string = '';
  isLoading: boolean = false;
  isLoadingCash: boolean = false;
  dataShipping!: Ishipping;
  

  checkoutForm: FormGroup = this._formBuilder.group({
    details: [null, [Validators.required, Validators.minLength(10)]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    city: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((pram) => {
      this.cartId = pram.get('id')!;
    });
  }

  submitFormOnline(): void {
    this.isLoading = true;
    this._orderService
      .checkOutSession(this.cartId, this.checkoutForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            open(res.session.url, '_self');
          }
          this.isLoading = false;
          this._cartService.cartNumber.set(0)      
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


  submitFormCash():void{
      this.isLoadingCash = true;
      this._orderService
        .checkOutCash(this.cartId, this.checkoutForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            if(res.status=='success'){
              this._router.navigate(['/allorders'])
            }
          this._cartService.cartNumber.set(0)      

          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

