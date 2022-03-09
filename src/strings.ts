/**
 * There are strings and there are types (don't forget about the literals!)
 */

function sayHello(str: string) {
  alert(str)
}

function getRecordDirty(records: string) {
  // but is there even a type for that record??
  // what if you misspell it??
  fetch({
    url: '/customer'
  })
}

function getRecordGood(records: 'customer' | 'product' | 'parts') {
}

// Let's be literal
type SinglePathRoute = `/${string}/:${string}`

function aRouteishString(route: SinglePathRoute) {

}

aRouteishString('customers/id')    // nope, requires '/' at beginning and then ':' after second /
aRouteishString('customers/:id')   // nope, still requires '/' at beginning
aRouteishString('/customers/:id')  // just right

// You can even go crazy if you have to... but probably dont
//
// something like this would allow us to interpolate with known chars
type KeyedString<K extends object> = `/${keyof K & string}/${keyof K & string}`


function interpolateString<K extends object>(obj: K, str: KeyedString<K>) {
  let retStr: string = str
  Object.keys(obj).forEach(key => {
    retStr = retStr.replace(key, obj[key])
  })
  return retStr
}

interpolateString({one: 1, two: 2, three: 3}, )
