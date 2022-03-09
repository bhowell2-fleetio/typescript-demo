// If the type is an array, return the value of the indices of the array
type ArrayValueType<T> = T extends Array<T> ? T[number] : T

// If the type is an array return it, otherwise return the type as an array
type ArrayOfType<T> = T extends Array<unknown> ? T : Array<T>

type IsAString = ArrayValueType<string>
type IsAString2 = ArrayValueType<string[]>
type ArrayOfStrings = ArrayOfType<string>

const notAString: IsAString = 3          // no bueno. believe it or not, 3 is not a string
const isAString: IsAString = "yesss"

const notAnArrayOfStrings: ArrayOfStrings = 'booo'   // no bueno
const anArrayOfStrings: ArrayOfStrings = ['yayyy', 'heyy']

/**
 * When do you see that type of stuff? You'll usually use it when you're creating
 * a much more generic interface to alert the user of the correct type returned.
 * You'll see some crazy stuff in libraries that uses tons of extends to ensure the
 * user is providing the correct type or making sure the returned type is correct
 * (maybe they are wrapping the value passed in).
 */


// Basically a tuple
const ALL_THE_NUMBERS = ["one", "two", "three"] as const

// not what we want. that's just an array of type string
function whichNumber(str: typeof ALL_THE_NUMBERS) {}
// whichNumber(['hey'])
whichNumber(['one', 'two', 'three'])

function whichNumberIndex(num: typeof ALL_THE_NUMBERS[number]){}
// whichNumberIndex('whatttt...')
whichNumberIndex('two')


//
//
// Key and value safety
//
//

// Ensures that the object has the keys of the provided type
type KeysAsValues<T extends object> = { [k in keyof T]: k}

type NoGoodKeysAsValues = KeysAsValues<string>  // object is any non-primitive (boolean, string, number, undefined, null, symbol, etc.)

interface Customer {
  id: string
  name: string
  favNumber: number
}

const CustomerFieldsNames: KeysAsValues<Customer> = {
  id: "id",  // invalid
  name: "name",
  favNumber: "favNumber"
}

// Partial makes everything optional, thus none are required, but if they WERE provided,
// the value would still have to be provided
const CustomerFieldsPartial: Partial<KeysAsValues<Customer>> = {
}
const CustomerFieldsPartial2: Partial<KeysAsValues<Customer>> = {
  name: "name" // see, no good
}

const AlmostCustomerFields: Omit<KeysAsValues<Customer>, 'id'> = {
  name: "name",
  favNumber: "favNumber"
}


/**
 * Most of these fields have the same value as their key, but as you can see
 * (even in the first record) some do not! Can we still require a function to
 * only accept the values of record types?? Of course, typescript is (almost)
 * limitless!
 */
const RECORD_TYPES = {
  AutoIntegrateInvoice: 'Invoice',
  AutoIntegrateRepairOrder: 'RepairOrder',
  AutoIntegrateRoNotificationPolicy: 'AutoIntegrateRoNotificationPolicy',
} as const

function getServiceRecordBad(recordType: string) {}
getServiceRecordBad("this is bad data! but who would ever do this?? you'd be surprised..")

function getServiceRecordNotThereYet(recordType: typeof RECORD_TYPES) {
  // this is an OBJECT!
  const a = recordType.AutoIntegrateInvoice
  const b = recordType.AutoIntegrateRepairOrder
}

function getServiceRecordCloser(recordType: keyof typeof RECORD_TYPES) {
  recordType
}

getServiceRecordCloser("AutoIntegrateInvoice")  // that's not actually the record type tho!! this shouldn't be valid

// this is what we want, but this is pretty ugly...
function getServiceRecordValhalla(recordType: (typeof RECORD_TYPES)[keyof typeof RECORD_TYPES]) {
}

getServiceRecordValhalla("AutoIntegrateInvoice")  // doesn't accept this bad type!!
getServiceRecordValhalla("Invoice")  // does accept the type!!



// RECORD_TYPES is a value, so we need it's type. hence: typeof
// But we need the keys of the record so that we can access the
// VALUES of the record for those keys.
type RecordTypes_Keys = keyof typeof RECORD_TYPES

// use this when you want to require that the type be one of the RECORD_TYPES values
export type RecordTypesValuesType = typeof RECORD_TYPES[RecordTypes_Keys]

// as we saw above this works too
// export type RecordTypesValues = (typeof RECORD_TYPES)[keyof typeof RECORD_TYPES]


// Typing can be a pain sometimes. Use any, but use it when you already know it
// has been constrained such that the data will be correct.
// Let's not kill ourselves typing.
