import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';

const pagesRoutes: Routes = [
   {
     path: 'page',
     component: PagesComponent,
     children: [
      {
        path: 'counter',
        component: CounterComponent
      },
      {
        path: 'fetch-data',
        component: FetchDataComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ]
   }
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
