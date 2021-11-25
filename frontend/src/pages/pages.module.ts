import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ComponentsModule } from 'src/components/components.module';
import { CoreModule } from 'src/core/core.module';
import { HomePageComponent } from './home-page/home-page.component';
import { VotingsPageComponent } from './votings-page/votings-page.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [HomePageComponent, VotingsPageComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    ChartsModule,
  ],
})
export class PagesModule {}
