import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material/material.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TixbankComponent } from './tixbank/tixbank.component';
import { MasterComponent } from './master/master.component';
import { ProxiesComponent } from './proxies/proxies.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';


@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        MenuBarComponent,
        SideBarComponent,
        TixbankComponent,
        MasterComponent,
        ProxiesComponent,
        LoginComponent,
        RegisterComponent,
        AdminDashboardComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FullCalendarModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
