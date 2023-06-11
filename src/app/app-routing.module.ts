import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Page404Component } from './components/page404/page404.component';
import { EmptyhomeComponent } from './components/emptyhome/emptyhome.component';
import { SigninComponent } from './components/signin/signin.component';
import { MainComponent } from './components/main/main.component';
import { CotizationComponent } from './components/cotization/cotization.component';

const routes: Routes = [
  {path: "", component:EmptyhomeComponent},
  {path: "home", component:EmptyhomeComponent},
  {path: "login", component:LoginComponent},
  {path: "signin", component:SigninComponent},
  {path: "main/:id", component:MainComponent},
  {path: "new-quotation/:id", component:CotizationComponent},
  {path: "**", component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
