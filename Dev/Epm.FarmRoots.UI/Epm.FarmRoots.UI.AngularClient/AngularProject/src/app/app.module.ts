import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PictureUploadComponent } from './components/picture-upload/picture-upload.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for toastr
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/*import { SidenavComponent } from './components/sidenav/sidenav.component'; // Import ToastrModule*/

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PictureUploadComponent,
    HomeComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule, // Initialize ToastrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
