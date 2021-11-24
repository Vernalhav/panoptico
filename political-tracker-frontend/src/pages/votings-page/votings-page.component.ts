import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { BackendQueryModel } from 'src/core/model/backend-query.model';

@Component({
  selector: 'app-votings-page',
  templateUrl: './votings-page.component.html',
  styleUrls: ['./votings-page.component.scss'],
})
export class VotingsPageComponent {
  constructor(readonly model: BackendQueryModel, readonly router: Router) {}

  public isCheckedParties = true;
  public isCheckedCongresspeople = true;
  
  public checkedPartiesChanged(e: MatSlideToggleChange) {
    this.isCheckedParties = e.checked;
  }

  public checkedCongresspeopleChanged(e: MatSlideToggleChange) {
    this.isCheckedCongresspeople = e.checked;
  }

  goBack() {
    this.model.clearQueryResults();
    this.router.navigate(['/']);
  }
}
