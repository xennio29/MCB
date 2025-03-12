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
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TixbankComponent } from './tixbank/tixbank.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MasterComponent } from './master/master.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProxiesComponent } from './proxies/proxies.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        MenuBarComponent,
        SideBarComponent,
        TixbankComponent,
        MasterComponent,
        ProxiesComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FullCalendarModule,
        MaterialModule,
        MatCardModule,
        MatListModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        MatExpansionModule,
        MatGridListModule,
        MatButtonToggleModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
