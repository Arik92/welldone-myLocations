import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTitleComponent } from './dynamic-title.component';

describe('DynamicTitleComponent', () => {
  let component: DynamicTitleComponent;
  let fixture: ComponentFixture<DynamicTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
