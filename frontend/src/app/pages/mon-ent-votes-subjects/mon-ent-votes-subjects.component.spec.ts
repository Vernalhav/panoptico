import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEntVotesSubjectsComponent } from './mon-ent-votes-subjects.component';

describe('MonEntVotesSubjectsComponent', () => {
  let component: MonEntVotesSubjectsComponent;
  let fixture: ComponentFixture<MonEntVotesSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonEntVotesSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonEntVotesSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
