import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
// import { LoginComponent } from './login/login.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { CustomerComponent } from './customer/customer.component';
// import { ProductComponent } from './product/product.component';
import { AccountComponent } from './account/account.component';
import { HinhanhComponent } from './hinhanh/hinhanh.component';
import { HoadonComponent } from './hoadon/hoadon.component';
import { CtdhComponent } from './ctdh/ctdh.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { SourceinputComponent } from './sourceinput/sourceinput.component';
import { PhieunhapComponent } from './phieunhap/phieunhap.component';
import { ChitietnhapComponent } from './chitietnhap/chitietnhap.component';
import { LoginnewComponent } from './loginnew/loginnew.component';
import { JoinComponent } from './join/join.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { StatisticComponent } from './statistic/statistic.component';
import {LoginComponent} from './components/login/login.component'
// import { RegisterComponent } from './register/register.component';
// import { RegisterComponent } from './components/register/register.component';
// import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';  
import { ThankyouComponent } from './thankyou/thankyou.component';  
import { ProductComponent } from './product/product.component';  
import { RegisterComponent } from './register/register.component';  
import { RegisternewComponent } from './registernew/registernew.component';  
import { ProfileComponent } from './profile/profile.component';  
import { AdminComponent } from './admin/admin.component';
import { AllProductsComponent } from './admin/component/all-products/all-products.component';
// import { LoginnewComponent } from './loginnew/loginnew.component'; 
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'registernew', component: RegisternewComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]  },

  { path: 'hinhanh', component: HinhanhComponent, canActivate: [AuthGuard]  },
  { path: '', component: SanphamComponent },
  { path: 'sanpham', component: SanphamComponent},
  { path: 'loai', component: CustomerComponent, canActivate: [AuthGuard] },
  // { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'hoadon', component: HoadonComponent, canActivate: [AuthGuard] },
  { path: 'ctdh', component: CtdhComponent, canActivate: [AuthGuard] },
  { path: 'khuyenmai', component: KhuyenmaiComponent, canActivate: [AuthGuard] },
  { path: 'sourceinput', component: SourceinputComponent, canActivate: [AuthGuard] },
  { path: 'phieunhap', component: PhieunhapComponent, canActivate: [AuthGuard] },
  { path: 'chitietphieunhap', component: ChitietnhapComponent, canActivate: [AuthGuard] },
  { path: 'loginnew', component: LoginnewComponent},
  { path: 'speech-to-text', component: SpeechToTextComponent, canActivate: [AuthGuard] },
  { path: 'join', component: JoinComponent, canActivate: [AuthGuard] },
  { path: 'statistic', component: StatisticComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'product', component: HeroesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'thankyou', component: ThankyouComponent },
  {path: 'product/:id', component: ProductComponent},
  {path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent},
  {path: 'all-products', component: AllProductsComponent},
  // {path: 'loginnew', component: LoginnewComponent},
  { path: '**', redirectTo: 'sanpham' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
