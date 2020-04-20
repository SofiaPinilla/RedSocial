import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NzFormModule } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './containers/user/register/register.component';
import { LoginComponent } from './containers/user/login/login.component';
import { HomeComponent } from './containers/home/home.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/publications/modal/modal.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { DirectsComponent } from './components/directs/directs.component';
import { BtaComponent } from './containers/bta/bta.component';
import { ConfimedComponent } from './containers/user/confimed/confimed.component';
import { PublicationComponent } from './components/publications/publication/publication.component';
import { SearchComponent } from './components/search/search.component';
import { ProfilesComponent } from './containers/profile/profiles/profiles.component';
import { UsersProfileComponent } from './containers/profile/users-profile/users-profile.component';
import { MessagesComponent } from './containers/messages/messages.component';




registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    PublicationsComponent,
    MenuComponent,
    ModalComponent,
    NotFoundComponent,
    DirectsComponent,
    BtaComponent,
    ConfimedComponent,
    PublicationComponent,
    SearchComponent,
    ProfilesComponent,
    UsersProfileComponent,
    MessagesComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
