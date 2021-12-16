import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InputAutocompleteComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputAutocompleteComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
