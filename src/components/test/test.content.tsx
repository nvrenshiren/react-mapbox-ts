import React, { useContext, useState } from 'react'
import { MapContext } from 'react-mapbox-ts'

interface Props {
  content: string
}

export default (props: Props) => {
  const { map } = useContext(MapContext)
  const [txt, setTxt] = useState(1)
  console.log(map)
  return (
    <div
      onClick={() => {
        setTxt(txt + 1)
      }}
    >
      {props.content}------{txt}
    </div>
  )
}
