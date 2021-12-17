import { Component } from '@angular/core';
import { BackendQueryModel } from 'src/app/core/models';
import { AvailablePartiesView } from 'src/app/core/views';

@Component({
  selector: 'app-mon-dep-expenses',
  templateUrl: './mon-dep-expenses.component.html',
  styleUrls: ['./mon-dep-expenses.component.scss']
})
export class MonDepExpensesComponent {
  
  public congresspersonId: number = -1;

  constructor(
    readonly availablePartiesView: AvailablePartiesView
  ) {}

  updateCongresspersonId(id:number){
    this.congresspersonId = id;
  }

}