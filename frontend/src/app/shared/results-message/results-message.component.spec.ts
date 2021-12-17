import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMessageComponent } from './results-message.component';

describe('ResultsMessageComponent', () => {
  let component: ResultsMessageComponent;
  let fixture: ComponentFixture<ResultsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
