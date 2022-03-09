interface A {
 a: number
}

interface B {
 b: number
}

interface C {
  c: string
}

interface D {
  d: string
}

function merge<O1, O2>(obj1: O1, obj2: O2): O1 & O2 {
  return {...obj1, ...obj2}
}

const aImpl = {} as A
const bImpl = {} as B
const cImpl = {} as C
const dImpl = {} as D

const ab = merge(aImpl, bImpl)
const ad = merge<A, C>(aImpl, cImpl)

const cd = merge(cImpl, dImpl)

const abcd = merge(merge(aImpl, bImpl), merge(cImpl, dImpl))
