import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonDepExpensesComponent } from './mon-dep-expenses.component';

describe('MonDepExpensesComponent', () => {
  let component: MonDepExpensesComponent;
  let fixture: ComponentFixture<MonDepExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonDepExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonDepExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
