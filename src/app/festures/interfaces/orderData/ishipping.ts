import { Product } from "../../../shared/interfaces/product"

      export interface Ishipping {
        taxPrice: number
        shippingPrice: number
        totalOrderPrice: number
        paymentMethodType: string
        isPaid: boolean
        isDelivered: boolean
        _id: string
        user: User
        cartItems: CartItem[]
        shippingAddress: ShippingAddress
        createdAt: string
        updatedAt: string
        id: number
        __v: number
      }
      
      export interface CartItem {
        count: number
        _id: string
        product: Product
        price: number
      }
      
      export interface ShippingAddress {
        details: string
        phone: string
        city: string
      }
      export interface User {
        _id: string
        name: string
        email: string
        phone: string
      }
