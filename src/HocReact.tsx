import React, { useState } from 'react'

export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
export type OptionalRelaxed<T, K extends string> = Partial<Pick<T, K & keyof T>> & Omit<T, K>

interface InputProps {
  error: string
  name: string
  value: any
}

function Input(props: InputProps) {
  return <> </>
}

function useValueContext(name: string): any {
  return ''
}
function useErrorContext(name: string): any {
  return ''
}

type CheckboxProps = InputProps

function CheckBox(props: CheckboxProps) {
  return <input checked={props.value} />
}

interface AutoValueProps {
  name: string
  value: any
}

function MakeAutoValueInput<P extends AutoValueProps>(Component: React.ComponentType<P>) {
  return function AutoValueInputHoc<PP extends Optional<P, 'value'>>(props: PP) {
    const { name } = props
    const value = useValueContext(name)
    return <Component value={value} {...(props as PP)} />
  }
}

interface AutoErrorProps {
  name: string
  error: any
}

function MakeAutoErrorInput<P extends AutoErrorProps>(Component: React.ComponentType<P>) {
  return function AutoValueInputHoc<PP extends Optional<P, 'error'>>(props: PP) {
    const { name } = props
    const error = useErrorContext(name)
    return <Component error={error} {...(props as PP)} />
  }
}

const AutoValueInput = MakeAutoValueInput(Input)
const AutoValueAutoErrorInput = MakeAutoErrorInput(MakeAutoValueInput(Input))
const AutoChecked = MakeAutoValueInput(CheckBox)

function ContextValueProvider({state}: any) {
  // provides values to context subscribers
  return <> </>
}

function ContextErrorProvider({errors}: any) {
  // provides errors to context subscribers
  return <> </>
}

function RenderMe() {
  const [state, setState] = useState({})
  const [errors, setErrors] = useState({})
  return (
    <>
      <ContextValueProvider value={state}>
        <ContextErrorProvider errors={errors}>
          <AutoValueInput error={'something'} name={'two'} />
          <AutoValueAutoErrorInput name={'one'} />
        </ContextErrorProvider>
      </ContextValueProvider>
    </>
  )
}
