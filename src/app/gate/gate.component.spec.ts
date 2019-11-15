import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateComponent } from './gate.component';

describe('GateComponent', () => {
  let component: GateComponent;
  let fixture: ComponentFixture<GateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
