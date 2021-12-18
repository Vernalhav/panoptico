import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app-component/app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    // Framework Imports
    BrowserModule,
    HttpClientModule,

    // Browser Routing Imports
    AppRoutingModule,
    BrowserAnimationsModule,
    
    // Application Modules
    CoreModule,
    PagesModule,
    FontAwesomeModule
  ],
  providers: [
    
  ],
})
export class AppModule {}
