import mapboxConf from '@/assets/mapbox.conf'
import mapboxgl from 'mapbox-gl'
import React, { useRef } from 'react'
import { Map, CustomLayerData, CustomLayer } from 'react-mapbox-ts'
import { LngLatLike } from 'mapbox-gl'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

const customLayerData = (): CustomLayerData => {
  const modelOrigin: LngLatLike = [148.9819, -35.39847]
  const modelAltitude = 0
  const modelRotate = [Math.PI / 2, 0, 0]
  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  )
  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
  }
  return {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    render(gl, matrix) {
      var rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      )
      var rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
      )
      var rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
      )
      var m = new THREE.Matrix4().fromArray(matrix)
      var l = new THREE.Matrix4()
        .makeTranslation(
          modelTransform.translateX,
          modelTransform.translateY,
          modelTransform.translateZ
        )
        .scale(
          new THREE.Vector3(
            modelTransform.scale,
            -modelTransform.scale,
            modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ)
      this.camera.projectionMatrix = m.multiply(l)
      this.renderer.state.reset()
      this.renderer.render(this.scene, this.camera)
      this.map.triggerRepaint()
    },
    onAdd(map, gl) {
      this.map = map
      this.camera = new THREE.Camera()
      this.scene = new THREE.Scene()
      var directionalLight = new THREE.DirectionalLight(0xffffff)
      directionalLight.position.set(0, -70, 100).normalize()
      this.scene.add(directionalLight)

      var directionalLight2 = new THREE.DirectionalLight(0xffffff)
      directionalLight2.position.set(0, 70, 100).normalize()
      this.scene.add(directionalLight2)
      var loader = new GLTFLoader()
      loader.load(
        'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
        (gltf) => {
          this.scene.add(gltf.scene)
        }
      )
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
      })
      this.renderer.autoClear = false
    }
  }
}

const Demo: React.FC = () => {
  const mapRef = useRef<mapboxgl.MapBoxPlus>()
  return (
    <Map
      // ref={mapRef}
      ref={(map) => {
        window.map = map
        mapRef.current = map
      }}
      accessToken={mapboxConf.accessToken}
      style="mapbox://styles/mapbox/light-v10"
      zoom={18}
      center={[148.9819, -35.3981]}
      pitch={60}
      antialias={true}
    >
      <CustomLayer data={customLayerData()} />
    </Map>
  )
}
export default Demo
