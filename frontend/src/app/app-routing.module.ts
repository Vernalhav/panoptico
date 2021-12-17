import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeComponent } from './pages/home/home.component';
import { MonDepExpensesComponent } from './pages/mon-dep-expenses/mon-dep-expenses.component';
import { MonEntProposicoesComponent } from './pages/mon-ent-proposicoes/mon-ent-proposicoes.component';
import { MonEntSubjectsComponent } from './pages/mon-ent-subjects/mon-ent-subjects.component';
import { MonEntVotesSubjectsComponent } from './pages/mon-ent-votes-subjects/mon-ent-votes-subjects.component';
import { MonEntVotingsComponent } from './pages/mon-ent-votings/mon-ent-votings.component';
import { MonPartsAndDepsComponent } from './pages/mon-parts-and-deps/mon-parts-and-deps.component';
import { MonitorMenuComponent } from './pages/monitor-menu/monitor-menu.component';
import { VotingsPageComponent } from './pages/votings-page/votings-page.component';

const routes: Routes = [
  // Old Pages
  { path: 'old', component: HomePageComponent },
  { path: 'old/votings', component: VotingsPageComponent },

  // New Pages
  { path: '', component: HomeComponent, },
  { path: 'monitores', component: MonitorMenuComponent },
  { path: 'monitor/partidos-e-deputados', component: MonPartsAndDepsComponent },
  
  { path: 'monitor/votacoes-entidades', component: MonEntVotingsComponent },
  { path: 'monitor/gastos-deputados', component: MonDepExpensesComponent },
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
