import { useEffect, useRef } from 'react'

export const useLatest = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value)
  ref.current = value
  return ref
}

export const usePrevious = <T>(
  value: T
): { readonly current: T | undefined } => {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref
}
