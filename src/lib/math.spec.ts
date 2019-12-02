import {
    M, m, c, isUnitary, isIdentity, isOne, isZero, equalsMatrix, transpose
} from "./math"

const identity2 = m([
    [c(1, 0), c(0, 0)],
    [c(0, 0), c(1, 0)]
])

const emptyMatrix = m([[]])

const identity3 = m([
    [c(1, 0), c(0, 0), c(0, 0)],
    [c(0, 0), c(1, 0), c(0, 0)],
    [c(0, 0), c(0, 0), c(1, 0)],
])

describe('complex functions', () => {

    describe('isOne', () => {
        it('should be correct positively', () => {
            expect(isOne(c(1, 0))).toBeTruthy()
        })
    })

    describe('isZero', () => {
        it('should be correct positively', () => {
            expect(isZero(c(0, 0))).toBeTruthy()
        })
    })
})

describe('matrix functions', () => {
    describe('equals', () => {
        it('should be correct positively', () => {
            expect(M.equals(emptyMatrix, emptyMatrix)).toBeTruthy()
            expect(M.equals(identity2, identity2)).toBeTruthy()
            expect(M.equals(identity3, identity3)).toBeTruthy()
        })
    })

    describe('isIdentity', () => {
        it('should be correct positively', () => {
            expect(isIdentity(identity2)).toBeTruthy()
            expect(isIdentity(identity3)).toBeTruthy()
        })
    })

    describe('transpose', () => {
        it('should be correct positively', () => {
            expect(M.equals(
                M.transpose(identity2),
                identity2)
            ).toBeTruthy()

            expect(M.equals(
                identity2,
                M.transpose(identity2))
            ).toBeTruthy()

            expect(M.equals(
                identity3,
                M.transpose(identity3))
            ).toBeTruthy()

            const mat = m([
                [c(1, 1), c(2, 2)],
                [c(3, 3), c(4, 4)]
            ])

            const matT = m([
                [c(1, -1), c(3, -3)],
                [c(2, -2), c(4, -4)]
            ])

            expect(M.equals(
                matT,
                M.transpose(mat)
            )).toBeTruthy()
        })
    })

    describe('multiply', () => {
        it('should handle empty matrices', () => {
            expect(M.equals(
                M.multiply(emptyMatrix, emptyMatrix),
                emptyMatrix
            )
            ).toBeTruthy()
        })

        it('should be correct positively', () => {
            expect(M.equals(
                M.multiply(identity2, identity2),
                identity2
            )).toBeTruthy()

            const mm = m([
                [c(9, 9), c(8, 8)],
                [c(7, 7), c(6, 6)]
            ])

            expect(M.equals(
                M.multiply(
                    identity2,
                    mm),
                mm
            )).toBeTruthy()

        })
    })

    describe('unitary', () => {
        it('should be correct positively', () => {
            expect(isUnitary(identity2)).toBeTruthy()
        })
    })

})

