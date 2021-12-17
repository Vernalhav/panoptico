import { Component, Input } from '@angular/core';
import { Congressperson } from 'src/app/core/entities';
// TODO: translate to english
export interface Despesas { 
  name: string, 
  cost: number, 
  notaFiscal: string
}
// TODO: inject expenses
const EXPENSES : Despesas[] = [
  {name: 'Rachadinha', cost: 100000, notaFiscal: 'example.org'},
  {name: 'Triplex', cost: 3000000, notaFiscal: 'example.org'},
  {name: 'Jogo do bixo', cost: 10000, notaFiscal: 'example.org'},
]

@Component({
  selector: 'app-congressperson-expenditure',
  templateUrl: './congressperson-expenditure.component.html',
  styleUrls: ['./congressperson-expenditure.component.scss']
})
export class CongresspersonExpenditureComponent {
  dataSource = EXPENSES; 
  displayedColumns: string[] = ['name', 'cost', 'notaFiscal'];
  
  @Input()
  congressperson: Congressperson | undefined = undefined;

  @Input()
  totalExpenses: number = 100000;
}