
interface A {
  a: string
}
interface B {
  b?: string
}
interface C {
  c?: string
}

const a: Promise<A> = Promise.resolve({a: "a"})
const b: Promise<B> = Promise.resolve({});
const c: Promise<C> = Promise.resolve({})

// treats this as an array b/c it could be modified, we get a type error in the Promise.all
const ps = [a,b,c]
Promise.all(ps).then(res => {
  res[0].a  // doesn't know what this is
})

// UGLY when the interface names arent so short and more generics and such
const promOldStyle: [Promise<A>, Promise<B>, Promise<C>] = [a,b,c]
Promise.all(promOldStyle).then(res => {
  res[0].a  // least there's typesafety here
})

// can actually do this too, b/c array can't be modified here
Promise.all([a,b,c]).then(res => {
  res[2].c  // bliss
})

// now we can just use 'as const' and it treats it as TYPE.
// i.e., a type where the first position is a promise of type A,
// second of type B, you get it...
const psTs3_4 = [a,b,c] as const
const promGood = Promise.all(psTs3_4).then(res => {
  res[1].b  // bliss
})



function useNotSoUsefulHook(): string[] {
  return ["one", "two", "three"]
}
const [one, two, three, four] = useNotSoUsefulHook()

function useUsefulHook(): [string, string, string] {
  return ["one", "two", "three"]
}
const [oneGood, twoGood, threeGood] = useUsefulHook()
