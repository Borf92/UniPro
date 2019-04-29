import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    PagesComponent,
    CounterComponent,
    FetchDataComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
