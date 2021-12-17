import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEntSubjectsComponent } from './mon-ent-subjects.component';

describe('MonEntSubjectsComponent', () => {
  let component: MonEntSubjectsComponent;
  let fixture: ComponentFixture<MonEntSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonEntSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonEntSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
