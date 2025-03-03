import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand/brand.service';
import { data } from '../../interfaces/brands/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private _brandService=inject(BrandService)
  brand:data={} as data

ngOnInit(): void {
    this.getABrand()
}
  getABrand():void{
    this._brandService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res)
        this.brand=res
      }
    })
  }

  getSBrand(id:string):void{
    this._brandService.getSpecificBrand(id).subscribe({
      next:(res)=>{
        console.log(res.data)
      }

    })
  }
}
