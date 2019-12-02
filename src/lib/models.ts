import { Vector, c, v, Matrix } from './math'

export interface Qubit {
    vector: Vector
}

export const sqrt2 = Math.sqrt(2)
export const sqrt2i = 1 / Math.sqrt(2)

export const ZeroQubit: Qubit = {
    vector: v([
        c(1, 0),
        c(0, 0)
    ])
}

export const OneQubit: Qubit = {
    vector: v([
        c(0, 0),
        c(1, 0)
    ])
}

export const PlusQubit: Qubit = {
    vector: v([
        c(sqrt2i, 0),
        c(sqrt2i, 0)
    ])
}

export interface SystemMeta {
    timeTick: number
}

export interface Gate {
    matrixFactory: (sys: SystemMeta) => Matrix
}

export interface Measurement { }

type Operation = (Gate | Measurement) & {
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
