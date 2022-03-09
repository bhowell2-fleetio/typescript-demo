import React from 'react'

type ErrorMessage = string

// null being no error
type ErrorCheckResult = ErrorMessage | null

type ErrorCheck<T> = (value: T) => ErrorCheckResult

type NumberErrorCheck = ErrorCheck<number>
type StringErrorCheck = ErrorCheck<string>

const isGreaterThan0_NUM_ERROR_CHECK: NumberErrorCheck = value => value > 0 ? null : 'Must be greater than 0.'

const lengthGreaterThan5: StringErrorCheck = str => str.length > 5 ? null : 'Must have length greater than 5.'

interface InputFieldProps<T> {
  value: T
  errorCheck: ErrorCheck<T>
  onChange?: (value: T) => void
}

function InputField<T>(props: InputFieldProps<T>) {
  const {value, errorCheck, onChange } = props
  return <div/>
}

interface Customer {
  name: string
  assignedId: number
}

function CreateCustomerPage() {
  const customer = {} as Customer
  return (
    <div>
      {/* This not what we want. In the history of the universe when is a name anything other than a string? */}
      <InputField value={customer.name} errorCheck={lengthGreaterThan5}/>
      <InputField value={customer.assignedId} errorCheck={isGreaterThan0_NUM_ERROR_CHECK}/>
    </div>
  )
}

interface A {
  a: string
  operateOnA: () => void
}

interface B {
  b: number
  operateOnB: () => void
}

function AComponent(props: A | B) {}

function Wtf() {
  return (
    <AComponent a={"heyy"} /> // must provide operateOnA or compile error
  )
}