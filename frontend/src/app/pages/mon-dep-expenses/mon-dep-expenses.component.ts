import { Component } from '@angular/core';
import { Congressperson } from 'src/app/core/entities';

@Component({
  selector: 'app-mon-dep-expenses',
  templateUrl: './mon-dep-expenses.component.html',
  styleUrls: ['./mon-dep-expenses.component.scss']
})
export class MonDepExpensesComponent {
  congresspeople: Congressperson[] = [
    new Congressperson(10100, 'Joaozin da barra', 'UF'),
    new Congressperson(1010, 'Tabata Amaral', 'SP'),
    new Congressperson(10101, 'Tiririca', 'MG'),
    new Congressperson(10100, 'Ze que foi', 'AC'),
  ];
}
