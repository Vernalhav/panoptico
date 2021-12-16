import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEntVotingsComponent } from './mon-ent-votings.component';

describe('MonEntVotingsComponent', () => {
  let component: MonEntVotingsComponent;
  let fixture: ComponentFixture<MonEntVotingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonEntVotingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonEntVotingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
