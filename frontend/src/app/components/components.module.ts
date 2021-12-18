import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CoreModule } from "../core/core.module";
import { CongresspeopleChecklistComponent } from "./congresspeople-checklist/congresspeople-checklist.component";
import { FilterableChecklistComponent } from "./filterable-checklist/filterable-checklist.component";
import { MonitoredDatesComponent } from "./monitored-dates/monitored-dates.component";
import { MonitoredKeywordsModule } from "./monitored-keywords/monitored-keywords.module";
import { TopicCardComponent } from "./topic-card/topic-card.component";
import { VotingCardComponent } from "./voting-card/voting-card.component";
import { VotingDetailsComponent } from "./voting-details/voting-details.component";

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { PartiesChecklistComponent } from "./parties-checklist/parties-checklist.component";
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { CongresspersonExpenditureComponent } from "./congressperson-expenditure/congressperson-expenditure.component";
import { ExternalModule } from "../external/external.module";
import { BinaryWordCloudComponent } from './binary-word-cloud/binary-word-cloud.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { CongresspersonSelectorComponent } from './congressperson-selector/congressperson-selector.component';

@NgModule({
  declarations: [
    CongresspeopleChecklistComponent,
    CongresspersonSelectorComponent,
    CongresspersonExpenditureComponent,
    FilterableChecklistComponent,
    MonitoredDatesComponent,
    VotingCardComponent,
    VotingDetailsComponent,
    TopicCardComponent,
    PartiesChecklistComponent,
    WordCloudComponent,
    BinaryWordCloudComponent,
  ],

  exports: [
    CongresspeopleChecklistComponent,
    CongresspersonSelectorComponent,
    CongresspersonExpenditureComponent,
    FilterableChecklistComponent,
    MonitoredDatesComponent,
    VotingCardComponent,
    MonitoredKeywordsModule,
    TopicCardComponent,
    PartiesChecklistComponent,
    WordCloudComponent,
    BinaryWordCloudComponent,
  ],

  imports: [
    // Angular Modules
    CommonModule,

    // Material UI & Font Awesome Modules
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    FontAwesomeModule,

    // App Modules
    CoreModule,
    MonitoredKeywordsModule,
    ExternalModule,
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
  
})

export class ComponentsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFileAlt);
  }
}