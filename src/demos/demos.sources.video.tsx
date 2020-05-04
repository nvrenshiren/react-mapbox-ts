import mapboxConf from '@/assets/mapbox.conf'
import React, { useRef, useCallback } from 'react'
import { Layer, Map, VideoSource, VideoSourcePlus } from 'react-mapbox-ts'

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map>()
  const videoRef = useRef<VideoSourcePlus>()
  const playRef = useRef(true)
  const videoClick = useCallback(() => {
    if (playRef.current) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    playRef.current = !playRef.current
  }, [])
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/satellite-v9"
      zoom={17}
      center={[-122.514426, 37.562984]}
      workercount={16}
      bearing={-96}
      minZoom={14}
      onClick={videoClick}
    >
      <VideoSource
        ref={(e) => {
          videoRef.current = e
        }}
        id="video"
        option={{
          urls: [
            'https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4',
            'https://static-assets.mapbox.com/mapbox-gl-js/drone.webm'
          ],
          coordinates: [
            [-122.51596391201019, 37.56238816766053],
            [-122.51467645168304, 37.56410183312965],
            [-122.51309394836426, 37.563391708549425],
            [-122.51423120498657, 37.56161849366671]
          ]
        }}
      >
        <Layer id="video" type="raster" source="video" />
      </VideoSource>
    </Map>
  )
}
export default Demo
