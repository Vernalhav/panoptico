import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorMenuComponent } from './monitor-menu.component';

describe('MonitorMenuComponent', () => {
  let component: MonitorMenuComponent;
  let fixture: ComponentFixture<MonitorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
