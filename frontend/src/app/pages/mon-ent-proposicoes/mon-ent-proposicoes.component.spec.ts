import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEntProposicoesComponent } from './mon-ent-proposicoes.component';

describe('MonEntProposicoesComponent', () => {
  let component: MonEntProposicoesComponent;
  let fixture: ComponentFixture<MonEntProposicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonEntProposicoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonEntProposicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
