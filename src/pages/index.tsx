import React, { useRef, useEffect } from 'react'
import Map, { Feature } from 'react-mapbox-ts'

export default () => {
  return (
    <Map
      accessToken="pk.eyJ1IjoiMTg2MjcwMjE1NDMiLCJhIjoiY2s4dHh3dnJ6MDBlMDNmb2l2bDQ4aDF1YSJ9.f6-80XxhwYLNJRDdntMF2w"
      style="mapbox://styles/mapbox/streets-v11"
      renderChildrenInPortal
    >
      <Feature></Feature>
    </Map>
  )
}
