import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/components/components.module';
import { CoreModule } from 'src/core/core.module';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonModule,
  ],
})
export class PagesModule {}
