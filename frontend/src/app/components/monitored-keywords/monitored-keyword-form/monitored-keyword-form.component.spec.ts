import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredKeywordFormComponent } from './monitored-keyword-form.component';

describe('MonitoredKeywordFormComponent', () => {
  let component: MonitoredKeywordFormComponent;
  let fixture: ComponentFixture<MonitoredKeywordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoredKeywordFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoredKeywordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
