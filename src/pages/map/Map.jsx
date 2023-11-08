import "./map.css"
import Navbar from '../../components/navbar/Navbar'
import ReactMapGl from 'react-map-gl'
import { useState } from "react"

export default function Map() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37,
    longitude: 37,
    zoom: 8
  })

  return (
    <>
      <Navbar />
      <div className="map">
        <ReactMapGl
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          onViewportChange={nextViewport => setViewport(nextViewport)}
        />
      </div>
    </>
  )
}
