import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendQueryModel } from 'src/core/model/backend-query.model';

@Component({
  selector: 'app-votings-page',
  templateUrl: './votings-page.component.html',
  styleUrls: ['./votings-page.component.scss'],
})
export class VotingsPageComponent {
  constructor(readonly model: BackendQueryModel, readonly router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }
}
