import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    CommonModule,
    RouterModule,

    // Material UI
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SharedModule { }
