import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order/order.service';
import { Ishipping } from '../../interfaces/orderData/ishipping';
import { Router } from 'express';

@Component({
  selector: 'app-cash-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './cash-check-out.component.html',
  styleUrl: './cash-check-out.component.scss',
})
export class CashCheckOutComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _orderService = inject(OrderService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  cartId: string = '';
  // dataShipping!: Ishipping;

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

  submitForm(): void {
    this.isLoading = true;
    this._orderService
      .checkOutCash(this.cartId, this.checkoutForm.value)
      .subscribe({
        next: (res) => {
          // this.dataShipping = res;
          console.log(res);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
