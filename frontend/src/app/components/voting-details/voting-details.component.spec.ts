import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingDetailsComponent } from './voting-details.component';

describe('VotingDetailsComponent', () => {
  let component: VotingDetailsComponent;
  let fixture: ComponentFixture<VotingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotingDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
