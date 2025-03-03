import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductItemComponent } from '../../../../../shared/components/ui/product-item/product-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent,FormsModule],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent implements OnInit {
  text:string="";
  products:WritableSignal<Product[]>= signal([])

  private readonly _productService= inject(ProductService)


  ngOnInit(): void {
      this.getProducts();
  }

  getProducts(){
    this._productService.getProduct().subscribe({
      next:(res)=>{
        console.log(res.data)

        this.products.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


}
