import { Component, Input } from '@angular/core';
import Party from 'src/app/core/interfaces/party.interface';

@Component({
  selector: 'app-filterable-checklist',
  templateUrl: './filterable-checklist.component.html',
  styleUrls: ['./filterable-checklist.component.scss'],
})
export class FilterableChecklistComponent {
  @Input()
  items: Party[] = [];
}
