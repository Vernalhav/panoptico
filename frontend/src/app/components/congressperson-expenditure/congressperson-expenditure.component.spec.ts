import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresspersonExpenditureComponent } from './congressperson-expenditure.component';

describe('CongresspersonExpenditureComponent', () => {
  let component: CongresspersonExpenditureComponent;
  let fixture: ComponentFixture<CongresspersonExpenditureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongresspersonExpenditureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresspersonExpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
