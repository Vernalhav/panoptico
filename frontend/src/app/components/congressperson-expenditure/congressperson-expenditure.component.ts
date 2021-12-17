import { Component, Input } from '@angular/core';
import { Congressperson } from 'src/app/core/entities';
import { CamaraService, Expense, ExpensesResponse } from 'src/app/core/services';
import { AvailablePartiesView } from 'src/app/core/views';


@Component({
  selector: 'app-congressperson-expenditure',
  templateUrl: './congressperson-expenditure.component.html',
  styleUrls: ['./congressperson-expenditure.component.scss']
})
export class CongresspersonExpenditureComponent { 
  
  private _congresspersonId?: number;
  
  displayedColumns: string[] = ['type', 'date', 'cost', 'documentUrl'];
  
  congressperson?: Congressperson = undefined;

  expenses?: ExpenseTableElement[];
  
  totalCost: number = 0;

  currencyFormater = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  
  @Input() set congresspersonId(value: number) {
    if (this._congresspersonId != value) {
      this._congresspersonId = value;
      this.fetchExpensesFromService(this._congresspersonId);
      this.congressperson = this.loadCongressperson(this._congresspersonId)
    }
  }
  
  constructor(
    private readonly partiesView: AvailablePartiesView,
    private readonly cameraService: CamaraService
  ) {}

  fetchExpensesFromService(id: number): void {
    this.cameraService.getExpensesFromCongressperson(id)
      .subscribe((response: ExpensesResponse) => {
        
        let tableElements: ExpenseTableElement[] = [];
        response.map((expense: Expense)=> { 
          
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

  loadCongressperson(id: number){
    for(let p of this.partiesView.availableParties)
      for(let m of p.members)
        if(id == m.id) return m;
    return undefined;
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