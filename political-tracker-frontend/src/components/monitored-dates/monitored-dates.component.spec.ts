import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredDatesComponent } from './monitored-dates.component';

describe('MonitoredDatesComponent', () => {
  let component: MonitoredDatesComponent;
  let fixture: ComponentFixture<MonitoredDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoredDatesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoredDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
