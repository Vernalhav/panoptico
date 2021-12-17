import { Component, Input } from '@angular/core';
import { CamaraService, Expense, ExpensesResponse } from 'src/app/core/services';


@Component({
  selector: 'app-congressperson-expenditure',
  templateUrl: './congressperson-expenditure.component.html',
  styleUrls: ['./congressperson-expenditure.component.scss']
})
export class CongresspersonExpenditureComponent { 
  private _congresspersonId?: number;
  
  displayedColumns: string[] = ['type', 'date', 'cost', 'documentUrl'];
  expenses?: ExpenseTableElement[];
  totalCost: number = 0;
  
  
  @Input() set congresspersonId(value: number) {
    if (this._congresspersonId != value) {
      this._congresspersonId = value;
      this.load(this._congresspersonId);
    }
  }
  
  constructor(private readonly svc: CamaraService) {}

  load(id: number): void {
    this.svc.getExpensesFromCongressperson(id).subscribe((response: ExpensesResponse) => {
      let tableElements: ExpenseTableElement[] = [];
      response.map((expense: Expense)=>{
        let element = new ExpenseTableElement(
          new Date(expense.dataDocumento),
          expense.tipoDespesa,
          expense.valorDocumento,
          expense.urlDocumento
        );
        tableElements.push(element);
      });
      this.expenses = tableElements;
      this.calculateTotalCost();
    });
  }

  private calculateTotalCost(): void {
    this.totalCost = 0;
    this.expenses?.forEach((expense) => this.totalCost += expense.cost);
  }
}

class ExpenseTableElement {
  date: Date;
  type: string;
  cost: number;
  documentUrl: string;

  constructor(date: Date, type: string, cost: number, documentUrl: string) {
    this.date = date;
    this.type = type;
    this.cost = cost;
    this.documentUrl = documentUrl;
  }
}