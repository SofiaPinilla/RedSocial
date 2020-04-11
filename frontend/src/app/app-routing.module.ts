import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './containers/user/login/login.component';
import { RegisterComponent } from './containers/user/register/register.component';
import { HomeComponent } from './containers/home/home.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './containers/not-found/not-found.component';


const routes: Routes = [
  {path:'',component:RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
