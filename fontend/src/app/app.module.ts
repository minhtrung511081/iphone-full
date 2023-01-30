import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { UsermanagerService } from './usermanager.service';



import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes/heroes.component';

import { CustomerComponent } from './customer/customer.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { ProductComponent } from './product/product.component';
// import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { HinhanhComponent } from './hinhanh/hinhanh.component';
import { HoadonComponent } from './hoadon/hoadon.component';
import { CtdhComponent } from './ctdh/ctdh.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { SourceinputComponent } from './sourceinput/sourceinput.component';
import { PhieunhapComponent } from './phieunhap/phieunhap.component';
import { ChitietnhapComponent } from './chitietnhap/chitietnhap.component';
import { LoginnewComponent } from './loginnew/loginnew.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { JoinComponent } from './join/join.component';
import { StatisticComponent } from './statistic/statistic.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './register/register.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { RegisternewComponent } from './registernew/registernew.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { MainContentComponent } from './admin/component/main-content/main-content.component';
import { AllProductsComponent } from './admin/component/all-products/all-products.component';
import { SidebarComponent } from './admin/component/sidebar/sidebar.component';
import { FootercComponent } from './admin/component/footerc/footerc.component';
import { HeadercComponent } from './admin/component/headerc/headerc.component';  


export function tokenGetter() {
  return localStorage.getItem('token');
}

const appRoutes: Routes = [
  { path: 'hero', component: HeroesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    RegisterComponent,
    CustomerComponent,
    SanphamComponent,
    ProductComponent,
    LoginComponent,
    AccountComponent,
    HinhanhComponent,
    HoadonComponent,
    CtdhComponent,
    KhuyenmaiComponent,
    SourceinputComponent,
    PhieunhapComponent,
    ChitietnhapComponent,
    LoginnewComponent,
    SpeechToTextComponent,
    JoinComponent,
    StatisticComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    ThankyouComponent,
    RegisternewComponent,
    ProfileComponent,
    AdminComponent,
    MainContentComponent,
    AllProductsComponent,
    SidebarComponent,
    FootercComponent,
    HeadercComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
//     RouterModule.forRoot([
// //     {path: 'heroes', component: HeroesComponent},
// //       {path: 'register', component: RegisterComponent},
// //       {path: 'loai', component: CustomerComponent},
// //       {path: 'sanpham', component: SanphamComponent},
// //       {path: 'product', component: ProductComponent},

//   ]),

  JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],

      }
    })

  ],
  providers: [
    AuthGuardService,
    AuthService,
    UsermanagerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

