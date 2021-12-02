import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredKeywordsListComponent } from './monitored-keywords-list.component';

describe('MonitoredKeywordsListComponent', () => {
  let component: MonitoredKeywordsListComponent;
  let fixture: ComponentFixture<MonitoredKeywordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoredKeywordsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoredKeywordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
