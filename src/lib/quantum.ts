import { Vector, Complex, v, dotProduct, norm } from './math'

export interface Qubit {
    vector: Vector
}

export function q(basis0: Complex, basis1: Complex): Qubit {
    return {
        vector: v([basis0, basis1])
    }
}

export function transitionAmplitude(q1: Qubit, q2: Qubit): Complex {
    const norm1 = norm(q1.vector)
    const norm2 = norm(q2.vector)
    const divisor = norm1 * norm2
    const dp = dotProduct(q1.vector, q2.vector)
    return {
        re: dp.re / divisor,
        im: dp.im / divisor
    }
}