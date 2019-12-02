import { transitionAmplitude, q } from './quantum'
import { c, isUnitary } from './math'

export function test() {
    const q1 = q(
        c(1, 0),
        c(0, -1)
    )
    const q2 = q(
        c(0, 1),
        c(1, 0)
    )

    console.log(
        transitionAmplitude(q1, q2)
    )
}