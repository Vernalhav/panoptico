import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresspersonSelectorComponent } from './congressperson-selector.component';

describe('CongresspersonSelectorComponent', () => {
  let component: CongresspersonSelectorComponent;
  let fixture: ComponentFixture<CongresspersonSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongresspersonSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresspersonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
