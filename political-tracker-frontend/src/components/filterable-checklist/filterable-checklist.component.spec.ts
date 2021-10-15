import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterableChecklistComponent } from './filterable-checklist.component';

describe('FilterableChecklistComponent', () => {
  let component: FilterableChecklistComponent;
  let fixture: ComponentFixture<FilterableChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterableChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterableChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
