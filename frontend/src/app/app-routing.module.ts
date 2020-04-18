import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './containers/user/login/login.component';
import { RegisterComponent } from './containers/user/register/register.component';
import { HomeComponent } from './containers/home/home.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { BtaComponent } from './containers/bta/bta.component';
import { ConfimedComponent } from './containers/user/confimed/confimed.component';
import { PublicationComponent } from './components/publications/publication/publication.component';
import { SearchComponent } from './components/search/search.component';
import { ProfilesComponent } from './containers/profile/profiles/profiles.component';


const routes: Routes = [
  {path: '', component: BtaComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'user/confirmado/:token',component:ConfimedComponent},
  {path:'publication/:id',component: PublicationComponent},
  {path: 'search/:search', component: SearchComponent},
  {path:'profiles',component:ProfilesComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
