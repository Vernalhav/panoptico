import { Component } from '@angular/core';
import { Congressperson } from 'src/app/core/entities';

@Component({
  selector: 'app-mon-dep-expenses',
  templateUrl: './mon-dep-expenses.component.html',
  styleUrls: ['./mon-dep-expenses.component.scss']
})
export class MonDepExpensesComponent {
  congresspeople: Congressperson[] = [
    new Congressperson(204558, 'Joaozin da barra', 'UF'),
    new Congressperson(141508, 'Tabata Amaral', 'SP'),
    new Congressperson(92172, 'Tiririca', 'MG'),
    new Congressperson(178951, 'Ze que foi', 'AC'),
  ];
}
