export interface Complex {
    re: number
    im: number
}

export function c(re: number, im: number): Complex {
    return { re, im }
}

export function v(xs: Complex[]): Vector {
    return {
        elements: xs
    }
}

export function m(xss: Complex[][]): Matrix {
    return {
        elements: xss
    }
}

export function conj(c: Complex) {
    return { ...c, im: -c.im }
}

export interface Matrix {
    elements: Complex[][]
}

export interface Vector {
    elements: Complex[]
}

type Transform<T> = (x: T) => T

export function mapM(cb: Transform<Complex>, mat: Matrix): Matrix {
    return {
        elements: mat.elements.map(row => row.map(cb))
    }
}

export function mapV(cb: Transform<Complex>, vec: Vector): Vector {
    return {
        elements: vec.elements.map(i => cb(i))
    }
}
export function transpose(mat: Matrix) {
    const result = m([])

    // initialize
    mat.elements[0].forEach(() => result.elements.push([]))

    mat.elements.forEach((row, ri) => row.forEach((x, ci) => {
        result.elements[ci][ri] = conj(x)
    }))

    return result
}

export function toStringM(mat: Matrix) {
    let res = '[\n'
    mat.elements.forEach(row => {
        res += '[ '

        row.forEach(x => {
            res += `(${x.re}, ${x.im}), `
        })
        res += ']\n'
    })
    return res + '\n]'
}

export function multiplyM(mat1: Matrix, mat2: Matrix): Matrix {
    const result: Complex[][] = []
    for (let i = 0; i < mat1.elements.length; i++) {
        result[i] = []
        for (let j = 0; j < mat2.elements[0].length; j++) {
            let sum = c(0, 0)
            for (let k = 0; k < mat1.elements[0].length; k++) {
                sum = add(sum, prod(mat1.elements[i][k], mat2.elements[k][j]))
            }
            result[i][j] = sum
        }
    }
    return m(result)
}

export function toMatrix(vec: Vector) {
    return m(vec.elements.map(e => ([e])))
}

export function add(x1: Complex, x2: Complex): Complex {
    return {
        re: x1.re + x2.re,
        im: x1.im + x2.im
    }
}

export function prod(x1: Complex, x2: Complex) {
    return {
        re: x1.re * x2.re - x1.im * x2.im,
        im: x1.im * x2.re + x1.re * x2.im
    }
}

export function dotProduct(v1: Vector, v2: Vector): Complex {
    const total: Complex = {
        re: 0,
        im: 0
    }
    v1.elements.forEach((x1, i) => {
        const x2 = v2.elements[i]
        const p = prod(x1, conj(x2))
        total.re += p.re
        total.im += p.im
    })
    return total
}

export function norm(vec: Vector): number {
    const sum = vec.elements.reduce((ac, x) => ac + (x.re ** 2 + x.im ** 2), 0)
    return Math.sqrt(sum)
}

export function isHermitian(mat: Matrix): boolean {
    const rows = mat.elements.length
    const cols = mat.elements[0].length
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const e1 = mat.elements[row][col]
            const e2 = mat.elements[col][row]

            // check for complex conjugate
            if (e1.re !== e2.re || e1.im !== -e1.im) {
                return false
            }
        }
    }

    return true
}


export function isOne(com: Complex) {
    return com.re === 1 && com.im === 0
}

export function isZero(com: Complex) {
    return com.re === 0 && com.im === 0
}

export function equalsComplex(c1: Complex, c2: Complex) {
    return c1.re === c2.re && c1.im === c2.im
}

export function equalsMatrix(m1: Matrix, m2: Matrix) {
    const rows = m1.elements.length
    const cols = m1.elements[0].length

    if (rows !== m2.elements.length) {
        return false
    }
    if (cols !== m2.elements[0].length) {
        return false
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const e1 = m1.elements[row][col]
            const e2 = m2.elements[row][col]
            if (!equalsComplex(e1, e2)) {
                return false
            }
        }
    }
    return true
}

export function initMatrix(rows: number, cols: number) {
    const elements = []
    for (let r = 0; r < rows; r++) {
        elements.push(new Array(cols))
    }
    return m(elements)
}

export function tensor(m1: Matrix, m2: Matrix) {
    const result = initMatrix(
        m1.elements.length * m2.elements.length,
        m1.elements[0].length * m2.elements[0].length
    )
    const m1Rows = m1.elements.length
    const m1Cols = m1.elements[0].length
    const m2Rows = m2.elements.length
    const m2Cols = m2.elements[0].length

    for (let r1 = 0; r1 < m1Rows; r1++) {
        for (let c1 = 0; c1 < m1Cols; c1++) {
            for (let r2 = 0; r2 < m2Rows; r2++) {
                for (let c2 = 0; c2 < m2Cols; c2++) {
                    const rResult = r2 + (r1 * m2Rows)
                    const cResult = c2 + (c1 * m2Cols)
                    const el1 = m1.elements[r1][c1]
                    const el2 = m2.elements[r2][c2]
                    result.elements[rResult][cResult] = prod(el1, el2)
                }
            }
        }
    }

    return result
}

export const C = {
    isOne,
    isZero,
    equals: equalsComplex
}

export const M = {
    equals: equalsMatrix,
    transpose,
    toString: toStringM,
    isIdentity,
    isHermitian,
    multiply: multiplyM
}

export function isIdentity(mat: Matrix): boolean {
    const rows = mat.elements.length
    const cols = mat.elements[0].length

    if (rows !== cols) {
        return false
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const e1 = mat.elements[row][col]
            if (row === col) {
                if (!isOne(e1)) {
                    return false
                }
            } else if (!isZero(e1)) {
                return false
            }
        }
    }

    return true
}

export function isUnitary(mat: Matrix): boolean {
    const matT = transpose(mat)
    const product = multiplyM(mat, matT)
    return isIdentity(product)
}