import React, { useRef, useEffect, useCallback } from 'react'

interface Props {
  content: string
}

export default (props: Props) => {
  const cref = useRef({ ...props })
  const pref = useRef({ ...props })
  cref.current = { ...props }
  const { content } = props
  const cb = useCallback(() => {}, [])
  useEffect(() => {
    cb()
  })
  return <div>{props.content}</div>
}
