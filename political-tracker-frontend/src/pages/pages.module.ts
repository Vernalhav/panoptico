import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { ComponentsModule } from 'src/components/components.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
  ],
})
export class PagesModule {}
