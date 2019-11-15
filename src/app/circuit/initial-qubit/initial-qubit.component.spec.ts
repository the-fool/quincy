import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialQubitComponent } from './initial-qubit.component';

describe('InitialQubitComponent', () => {
  let component: InitialQubitComponent;
  let fixture: ComponentFixture<InitialQubitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialQubitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialQubitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
