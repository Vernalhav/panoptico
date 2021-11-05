import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsPageComponent } from './votings-page.component';

describe('VotingsPageComponent', () => {
  let component: VotingsPageComponent;
  let fixture: ComponentFixture<VotingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotingsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
