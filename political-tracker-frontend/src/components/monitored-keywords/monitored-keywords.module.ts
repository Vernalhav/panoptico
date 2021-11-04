import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MonitoredKeywordFormComponent } from './monitored-keyword-form/monitored-keyword-form.component';
import { MonitoredKeywordListItemComponent } from './monitored-keyword-list-item/monitored-keyword-list-item.component';
import { MonitoredKeywordsListComponent } from './monitored-keywords-list/monitored-keywords-list.component';
import { MonitoredKeywordsComponent } from './monitored-keywords.component';

@NgModule({
  declarations: [
    MonitoredKeywordsComponent,
    MonitoredKeywordsListComponent,
    MonitoredKeywordListItemComponent,
    MonitoredKeywordFormComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [MonitoredKeywordsComponent, MonitoredKeywordsListComponent],
})
export class MonitoredKeywordsModule {}
