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
import {MatTableModule} from '@angular/material/table';
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { PartiesChecklistComponent } from "./parties-checklist/parties-checklist.component";
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { AngularD3CloudModule } from "angular-d3-cloud";
import { CongresspersonExpenditureComponent } from "./congressperson-expenditure/congressperson-expenditure.component";


@NgModule({
  declarations: [
    CongresspeopleChecklistComponent,
    CongresspersonExpenditureComponent,
    FilterableChecklistComponent,
    MonitoredDatesComponent,
    VotingCardComponent,
    VotingDetailsComponent,
    TopicCardComponent,
    PartiesChecklistComponent,
    WordCloudComponent,
  ],

  exports: [
    CongresspeopleChecklistComponent,
    CongresspersonExpenditureComponent,
    FilterableChecklistComponent,
    MonitoredDatesComponent,
    VotingCardComponent,
    MonitoredKeywordsModule,
    TopicCardComponent,
    PartiesChecklistComponent,
    WordCloudComponent,
  ],

  imports: [
    // Angular Modules
    CommonModule,

    // Material UI Modules
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
    AngularD3CloudModule,

    // App Modules
    CoreModule,
    MonitoredKeywordsModule,
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
  
})
export class ComponentsModule {}
