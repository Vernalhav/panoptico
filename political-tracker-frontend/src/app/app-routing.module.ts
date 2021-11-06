import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/pages/home-page/home-page.component';
import { VotingsPageComponent } from 'src/pages/votings-page/votings-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'votings', component: VotingsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
