import React, { useContext } from 'react'
import { MapContext } from './components/context'

const Feature: React.FC = (props) => {
  const { map } = useContext(MapContext)
  console.log(map)
  return null
}

export default Feature
