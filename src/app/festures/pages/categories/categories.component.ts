import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Icategory } from '../../interfaces/categories/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  category:Icategory={} as Icategory

  private _categoriesService=inject(CategoriesService)
  
  ngOnInit(): void {
      this.getCategory()
  }
  getCategory():void{
    this._categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.category=res
      }
    })
  }
}
