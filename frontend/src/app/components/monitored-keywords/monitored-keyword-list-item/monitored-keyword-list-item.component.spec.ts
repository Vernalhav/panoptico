import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredKeywordListItemComponent } from './monitored-keyword-list-item.component';

describe('MonitoredKeywordListItemComponent', () => {
  let component: MonitoredKeywordListItemComponent;
  let fixture: ComponentFixture<MonitoredKeywordListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoredKeywordListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoredKeywordListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
