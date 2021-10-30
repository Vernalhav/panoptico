import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredKeywordsComponent } from './monitored-keywords.component';

describe('MonitoredKeywordsComponent', () => {
  let component: MonitoredKeywordsComponent;
  let fixture: ComponentFixture<MonitoredKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoredKeywordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoredKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
