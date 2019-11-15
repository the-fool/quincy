import {Complex, complex, sqrt} from 'mathjs'


export interface Qubit {
    basis0: Complex
    basis1: Complex
}

export const sqrt2 = sqrt(2)
export const sqrt2i = 1 / sqrt(2)

export const ZeroQubit: Qubit = {
    basis0: complex(1, 0),
    basis1: complex(0, 0)
}

export const OneQubit: Qubit = {
    basis0: complex(0, 0),
    basis1: complex(1, 0)
}

export const PlusQubit: Qubit = {
    basis0: complex(sqrt2i, 0),
    basis1: complex(sqrt2i, 0)
}

export interface Matrix {
    components: number[][]
}

export interface Gate {
    matrix: Matrix
}

export interface TimeChangingGate extends Gate {
    matrixFunction: (time: number) => Matrix
}

export interface Measurement { }

type Operation = (Gate | TimeChangingGate | Measurement) & {
    id: number
    name: string
    tooltip: string
}

export interface Register {
    initialValue: Qubit
    gates: Operation[]
}

export interface Circuit {
    registers: Register[]
}

export const EMPTY_CIRCUIT: Circuit = {
    registers: []
}
