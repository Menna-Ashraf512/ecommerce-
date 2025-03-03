import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { ProductItemComponent } from '../../../shared/components/ui/product-item/product-item.component';
import { RecentProductsComponent } from "../home/components/recent-products/recent-products.component";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../core/pipes/search.pipe';

@Component({
  selector: 'app-products',
  imports: [ProductItemComponent,FormsModule,SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

    // products:WritableSignal<Product[]>= signal([])

    text:string="";
    products!:Product[]

      private readonly _productService= inject(ProductService)
  
  
    ngOnInit(): void {
        this.getProducts();
    }
  
    getProducts(){
      this._productService.getProduct().subscribe({
        next:(res)=>{
          console.log(res.data)
  
          this.products=res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

}
