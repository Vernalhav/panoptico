import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { ResultsMessageComponent } from './results-message/results-message.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InputAutocompleteComponent,
    ResultsMessageComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputAutocompleteComponent,
    ResultsMessageComponent,
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
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
