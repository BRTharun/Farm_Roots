import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PictureUploadComponent } from './components/picture-upload/picture-upload.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for toastr
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PictureUploadComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // Initialize ToastrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
