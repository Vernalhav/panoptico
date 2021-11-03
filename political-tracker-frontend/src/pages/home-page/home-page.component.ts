import { Component } from '@angular/core';
import { Party } from 'src/core/model/entities/party.entity';
import { AvailablePartiesView } from 'src/core/view/available-parties.view';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  parties: Party[] = [];

  constructor(readonly availablePartiesView: AvailablePartiesView) {}
}
