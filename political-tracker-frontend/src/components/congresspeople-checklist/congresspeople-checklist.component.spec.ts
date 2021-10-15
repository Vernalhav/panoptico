import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresspeopleChecklistComponent } from './congresspeople-checklist.component';

describe('CongresspeopleChecklistComponent', () => {
  let component: CongresspeopleChecklistComponent;
  let fixture: ComponentFixture<CongresspeopleChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongresspeopleChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresspeopleChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
