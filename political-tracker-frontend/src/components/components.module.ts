import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CoreModule } from 'src/core/core.module';
import { CongresspeopleChecklistComponent } from './congresspeople-checklist/congresspeople-checklist.component';
import { FilterableChecklistComponent } from './filterable-checklist/filterable-checklist.component';
import { MonitoredKeywordsModule } from './monitored-keywords/monitored-keywords.module';

@NgModule({
  declarations: [
    CongresspeopleChecklistComponent,
    FilterableChecklistComponent,
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
    CoreModule,
  ],
  exports: [
    CongresspeopleChecklistComponent,
    FilterableChecklistComponent,
    MonitoredKeywordsModule,
  ],
})
export class ComponentsModule {}
