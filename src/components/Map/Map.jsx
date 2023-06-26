import React, { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { addPoint } from '../../redux/reducers/pointReducer';
import Line from '../Line/Line';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

const Map = () => {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.map.points);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 6,
  });

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;
    const newPoint = {
      latitude: lat,
      longitude: lng,
    };
    dispatch(addPoint(newPoint));
  };
  const calculateDistance = (pointA, pointB) => {
    const lonA = pointA.longitude;
    const latA = pointA.latitude;
    const lonB = pointB.longitude;
    const latB = pointB.latitude;

    const R = 6371;
    const dLat = (latB - latA) * (Math.PI / 180);
    const dLon = (lonB - lonA) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latA * (Math.PI / 180)) *
        Math.cos(latB * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    console.log(distance);
    return distance.toFixed(2);
  };

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={
          'pk.eyJ1IjoiZGViYXNpc2gtZGV2IiwiYSI6ImNsamMzMno3bTA1Zm4zZHFtbGxuaTY0MnkifQ.Nc0Kalhw-lEBtIpl3A0nDA'
        }
        onViewportChange={(newViewport) => setViewport(newViewport)}
        onClick={handleMapClick}
        mapStyle='mapbox://styles/debasish-dev/cljc3kpdw006n01mg8r19464b'
      >
        {points.map((point, index) => (
          <Marker
            key={index}
            latitude={point.latitude}
            longitude={point.longitude}
          >
            <div className='marker'></div>
          </Marker>
        ))}

        {points.length >= 2 && <Line points={points} />}

        {points.length > 1 &&
          points.map((point, index) => {
            if (index > 0) {
              const prevPoint = points[index - 1];
              return (
                <React.Fragment key={index}>
                  <Marker
                    longitude={(prevPoint.longitude + point.longitude) / 2}
                    latitude={(prevPoint.latitude + point.latitude) / 2}
                    closeButton={false}
                  >
                    <div className='distance'>
                      {calculateDistance(prevPoint, point)} km
                    </div>
                  </Marker>
                </React.Fragment>
              );
            }
          })}

        <div style={{ position: 'absolute', right: 10, top: 10 }}>
          <NavigationControl showCompass={false} />
        </div>
      </ReactMapGL>
    </>
  );
};

export default Map;
