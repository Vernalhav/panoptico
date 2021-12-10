import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartsModule } from 'ng2-charts';

import { CoreModule } from '../core/core.module';
import { ComponentsModule } from '../components/components.module';

import { HomePageComponent } from './home-page/home-page.component';
import { VotingsPageComponent } from './votings-page/votings-page.component';
import { TabCloudsComponent } from './votings-page/tab-clouds/tab-clouds.component';

@NgModule({
  declarations: [
    // Pages
    HomePageComponent, 
    VotingsPageComponent, 
    
    // Pages Components
    TabCloudsComponent
  ],
  imports: [
    // Angular Imports
    CommonModule,
    
    // Material UI & Frameworks Imports
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatGridListModule,
    ChartsModule,

    // Project Imports
    CoreModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
