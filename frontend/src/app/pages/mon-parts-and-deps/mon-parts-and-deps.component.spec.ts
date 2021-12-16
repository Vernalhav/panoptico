import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonPartsAndDepsComponent } from './mon-parts-and-deps.component';

describe('MonPartsAndDepsComponent', () => {
  let component: MonPartsAndDepsComponent;
  let fixture: ComponentFixture<MonPartsAndDepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonPartsAndDepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonPartsAndDepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
