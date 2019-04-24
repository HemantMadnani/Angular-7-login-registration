import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginService } from './services/login.service';
import { User } from './model/user.model';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { ErrorInterceptor } from './backends/error.interceptor';
import { JwtInterceptor } from './backends/jwt.interceptor';
import { FakeBackendInterceptor } from './backends/fake-backend';
import { AlertComponent } from './comp/alert.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent, AlertComponent, SidebarComponent, TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule
  ],
  exports: [RegistrationComponent],
  providers: [LoginService, User, AlertService, UserService,  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, FakeBackendInterceptor ],
  bootstrap: [AppComponent]
})
export class AppModule { }
