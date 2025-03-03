import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layout/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';

export const routes: Routes = [
    {path:'',component:BlankLayoutComponent ,canActivate:[authGuard],children:[
        {path:"home",loadComponent: ()=> import('./festures/pages/home/home.component').then(c => c.HomeComponent)},
        {path:"brands",loadComponent: ()=> import('./festures/pages/brands/brands.component').then(c => c.BrandsComponent)},
        {path:"products",loadComponent: ()=> import('./festures/pages/products/products.component').then(c => c.ProductsComponent)},
        {path:"categories",loadComponent: ()=> import('./festures/pages/categories/categories.component').then(c => c.CategoriesComponent)},
        {path:"allorders",loadComponent: ()=> import('./festures/pages/orders/orders.component').then(c => c.OrdersComponent)},
        {path:"cart",loadComponent: ()=> import('./festures/pages/cart/cart.component').then(c => c.CartComponent)},    
        {path:"checkout/:id",loadComponent: ()=> import('./festures/pages/checkout/checkout.component').then(c => c.CheckoutComponent)},    
        {path:"wishList",loadComponent: ()=> import('./festures/pages/wish-list/wish-list.component').then(c => c.WishListComponent)},    
        {path:"details/:id",loadComponent: ()=> import('./shared/components/detalis/detalis.component').then(c => c.DetalisComponent)},    
    ]},
    {path:'',component:AuthLayoutComponent,canActivate:[logedGuard],children:[
        {path:'', redirectTo:'login',pathMatch:'full'},
        {path:"register",loadComponent: ()=> import('./core/pages/register/register.component').then(c => c.RegisterComponent)},
        {path:"login",loadComponent: ()=> import('./core/pages/login/login.component').then(c => c.LoginComponent)},
        {path:"forget-password",loadComponent: ()=> import('./core/pages/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent)},
    ]},
    
    
    {path:"**",loadComponent: ()=> import('./core/pages/not-found/not-found.component').then(c => c.NotFoundComponent)},
];
