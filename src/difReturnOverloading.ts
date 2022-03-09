/**
 * Function overloads generally arent very nice, but there are some
 * use cases that will arise. The better overloading is when
 */
function fun1(a: string)
function fun1(a: string, b: number)
function fun1(...args: any[]) {
  // now you've gotta extract each position anad they're an any...
  if (args.length === 1) {
    const a: string = args[0]
  }
}

fun1(3) // knows this is invalid, though
fun1("fleetio") // good to go
fun1(3, "") // still no
fun1("fleeettt", 333) // good to go

/**
 * Diff return overloading
 */

interface Place<N extends number> {
 place: N
}

interface NumberOne {
  theGoat: () => void
}
interface NumberTwo {
  firstLoser: () => void
}
interface NumberThree {
  third: () => void
}

function getPlaceFn(place: Place<1>): NumberOne
function getPlaceFn(place: Place<2>): NumberTwo
function getPlaceFn(place: Place<3>): NumberThree
// function getPlaceFn(place: Place<1> | Place<2> | Place<3>): any {
// }
// function getPlaceFn(place: Place<1> | Place<2> | Place<3>): NumberOne | NumberTwo | NumberThree {
  // return null
// }
function getPlaceFn(place: Place<any>): NumberThree | NumberTwo | NumberOne {
  return null
}



// Shamelessly taken from lodash.
function get<TObject extends object, TKey extends keyof TObject>(object: TObject, path: TKey | [TKey]): TObject[TKey]
function get<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1]>(object: TObject, path: [TKey1, TKey2]): TObject[TKey1][TKey2]
function get<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2]>(object: TObject, path: [TKey1, TKey2, TKey3]): TObject[TKey1][TKey2][TKey3]
function get<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2], TKey4 extends keyof TObject[TKey1][TKey2][TKey3]>(object: TObject, path: [TKey1, TKey2, TKey3, TKey4]): TObject[TKey1][TKey2][TKey3][TKey4]
function get<TObject>(obj: TObject, path: any) {
}

interface DeeplyNested {
  a: {
    b: {
      c: {
        d: {

        }
      }
    }
    aa: {

    }
  }
}

const dd: DeeplyNested = {} as any

get(dd, 'a')
get(dd, ['a', 'b', 'c', 'd'])  // wrong! b is before c!
