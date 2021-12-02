import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Party } from 'src/app/core/entities';
import { BackendQueryModel } from 'src/app/core/models';
import { AvailablePartiesView } from 'src/app/core/views';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  parties: Party[] = [];

  constructor(
    readonly availablePartiesView: AvailablePartiesView,
    readonly backendQueryModel: BackendQueryModel,
    readonly router: Router,
  ) {}

  handleMonitorButton() {
    this.backendQueryModel.queryUsingCurrentFilters();
    this.router.navigate(['votings']);
  }
}
