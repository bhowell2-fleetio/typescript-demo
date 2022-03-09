/**
 * We've all heard of the billion dollar mistake. That's what everyone uses to sell typing.
 * Well, I'm no different. Here it is. Null safety.
 */

interface Customer {
  id: number
  name: string
  subAccounts?: Customer[]  // Array of customers or undefined
  parentAccount: Customer | null
  maybe1?: {
    maybe2?: {
      fn: () => void
    }
  }
}

// enable/disable tsconfig strictNullChecks for this
function handleCustomer(customer: Customer) {
  const { id, name, subAccounts, parentAccount } = customer
  subAccounts?.map(cust => {
    // well well well, we might get a NullPointerException (NPE) - i've regressed into the Java world.
    // In javascript land you get the message: "'map' does not exist on type undefined"
  })
  customer.maybe1?.maybe2?.fn()
  // parentAccount could be null so another NPE...
  parentAccount?.id.toFixed()
}

function returnNumOrNullString(aNum: number | null) {
  return aNum || "null"
}
returnNumOrNullString(0) // 0 is falsy, so returns "null"
returnNumOrNullString(null) // returns "null"

function returnNumOrNullStringCorrectly(aNum: number | null) {
  return aNum ?? "null"
}
returnNumOrNullStringCorrectly(0) // returns 0
returnNumOrNullStringCorrectly(null) // returns "null"
