import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CoreModule } from 'src/core/core.module';
import { CongresspeopleChecklistComponent } from './congresspeople-checklist/congresspeople-checklist.component';
import { FilterableChecklistComponent } from './filterable-checklist/filterable-checklist.component';
import { MonitoredDatesComponent } from './monitored-dates/monitored-dates.component';
import { MonitoredKeywordsModule } from './monitored-keywords/monitored-keywords.module';

@NgModule({
  declarations: [
    CongresspeopleChecklistComponent,
    FilterableChecklistComponent,
    MonitoredDatesComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MonitoredKeywordsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [
    CongresspeopleChecklistComponent,
    FilterableChecklistComponent,
    MonitoredDatesComponent,
    MonitoredKeywordsModule,
  ],
})
export class ComponentsModule {}
