import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBarChartComponent } from './result-bar-chart.component';

describe('VotingCardComponent', () => {
  let component: ResultBarChartComponent;
  let fixture: ComponentFixture<ResultBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultBarChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
