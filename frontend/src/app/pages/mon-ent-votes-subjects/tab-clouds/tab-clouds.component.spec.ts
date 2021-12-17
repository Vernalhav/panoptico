import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCloudsComponent } from './tab-clouds.component';

describe('TabCloudsComponent', () => {
  let component: TabCloudsComponent;
  let fixture: ComponentFixture<TabCloudsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCloudsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCloudsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
