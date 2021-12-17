import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHandshake, faShieldAlt, faUniversity } from '@fortawesome/free-solid-svg-icons';

import { CoreModule } from '../core/core.module';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { TabCloudsComponent } from './mon-ent-votes-subjects/tab-clouds/tab-clouds.component';
import { HomeComponent } from './home/home.component';
import { MonitorMenuComponent } from './monitor-menu/monitor-menu.component';
import { MonPartsAndDepsComponent } from './mon-parts-and-deps/mon-parts-and-deps.component';
import { MonEntVotingsComponent } from './mon-ent-votings/mon-ent-votings.component';
import { MonEntSubjectsComponent } from './mon-ent-subjects/mon-ent-subjects.component';
import { MonEntProposicoesComponent } from './mon-ent-proposicoes/mon-ent-proposicoes.component';
import { MonEntVotesSubjectsComponent } from './mon-ent-votes-subjects/mon-ent-votes-subjects.component';
import { MonDepExpensesComponent } from './mon-dep-expenses/mon-dep-expenses.component';


@NgModule({
  declarations: [
    // Pages Components
    TabCloudsComponent, 

    // New Pages
    HomeComponent, MonitorMenuComponent, MonPartsAndDepsComponent, MonEntVotingsComponent, MonEntSubjectsComponent, MonEntProposicoesComponent, MonEntVotesSubjectsComponent, MonDepExpensesComponent
  ],
  imports: [
    // Angular Imports
    CommonModule,
    RouterModule,
    
    // Material UI & Frameworks Imports
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    ChartsModule,
    FontAwesomeModule,

    // Project Imports
    CoreModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class PagesModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faHandshake, faShieldAlt, faUniversity);
  }
}
