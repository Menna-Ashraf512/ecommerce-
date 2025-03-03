import { Component, inject, OnInit } from '@angular/core';
import { RecentProductsComponent } from "./components/recent-products/recent-products.component";
import { PopularCategoryComponent } from "./components/popular-category/popular-category.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RecentProductsComponent, PopularCategoryComponent, MainSliderComponent, DatePipe,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  date= new Date


  

}
