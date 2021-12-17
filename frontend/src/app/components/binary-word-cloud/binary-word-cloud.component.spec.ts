import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryWordCloudComponent } from './binary-word-cloud.component';

describe('BinaryWordCloudComponent', () => {
  let component: BinaryWordCloudComponent;
  let fixture: ComponentFixture<BinaryWordCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinaryWordCloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryWordCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
