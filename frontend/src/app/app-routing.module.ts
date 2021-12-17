import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MonEntProposicoesComponent } from './pages/mon-ent-proposicoes/mon-ent-proposicoes.component';
import { MonEntSubjectsComponent } from './pages/mon-ent-subjects/mon-ent-subjects.component';
import { MonEntVotesSubjectsComponent } from './pages/mon-ent-votes-subjects/mon-ent-votes-subjects.component';
import { MonEntVotingsComponent } from './pages/mon-ent-votings/mon-ent-votings.component';
import { MonPartsAndDepsComponent } from './pages/mon-parts-and-deps/mon-parts-and-deps.component';
import { MonitorMenuComponent } from './pages/monitor-menu/monitor-menu.component';

const routes: Routes = [
  // New Pages
  { path: '', component: HomeComponent, },
  { path: 'monitores', component: MonitorMenuComponent },
  { path: 'monitor/partidos-e-deputados', component: MonPartsAndDepsComponent },
  
  { path: 'monitor/votacoes-entidades', component: MonEntVotingsComponent },
  { path: 'monitor/tematicas-entidades', component: MonEntSubjectsComponent },
  { path: 'monitor/proposicoes-entidades', component: MonEntProposicoesComponent },
  { path: 'monitor/votes-por-temas-entidades', component: MonEntVotesSubjectsComponent },

  // 404 Callback
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
