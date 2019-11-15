import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Circuit, ZeroQubit, Register, OneQubit, Qubit } from '../store/circuit/models'

const TEST_CIRCUT: Circuit = {
  registers: [
    {
      initialValue: ZeroQubit,
      gates: []
    },
    {
      initialValue: OneQubit,
      gates: []
    }
  ]
}

@Component({
  selector: 'quincy-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.styl']
})
export class CircuitComponent implements OnInit {
  REGISTER_HEIGHT = 60
  circuit$: Observable<Circuit>

  constructor() { }

  ngOnInit() {
    this.circuit$ = of(TEST_CIRCUT)
  }

  get registers$(): Observable<Register[]> {
    return this.circuit$.pipe(
      map(c => c.registers))
  }

  registerOffsetV(index: number) {
    return (index + 1) * this.REGISTER_HEIGHT
  }

  initialQubit(q: Qubit) {
    switch (q) {
      case ZeroQubit: {
        return '|0>'
      }
      case OneQubit: {
        return '|1>'
      }
      default: {
        return `${q.basis0}|0> + ${q.basis1}|1>`
      }
    }
  }
}
