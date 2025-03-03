import { Category } from "./category"
import { Brand, Subcategory } from "./product"

export interface WishList {
    status: string
    count: number
    data: Daum[]
  }
  
  export interface Daum {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    __v: number
    id: string
    priceAfterDiscount?: number
    availableColors?: any[]
  }
  

