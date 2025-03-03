import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { Category } from '../../../../../shared/interfaces/category';
import {OwlOptions} from '../../../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model'
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-category',
  imports: [CarouselModule],
  templateUrl: './popular-category.component.html',
  styleUrl: './popular-category.component.scss'
})
export class PopularCategoryComponent implements OnInit {

  _categoriesService=inject(CategoriesService)

  // categories!:Category[]
  categories:WritableSignal<Category[]>=signal([])

   customOptions: OwlOptions = { 
    loop: true,
    mouseDrag: true ,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    rtl:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }
  ngOnInit(): void {
      this.getCategories()
  }
  getCategories(){
    this._categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categories.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
