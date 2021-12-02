import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartiesChecklistComponent } from './parties-checklist.component';

describe('PartiesChecklistComponent', () => {
  let component: PartiesChecklistComponent;
  let fixture: ComponentFixture<PartiesChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartiesChecklistComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiesChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
