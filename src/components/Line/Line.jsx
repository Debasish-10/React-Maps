import React from 'react';
import { Source, Layer } from 'react-map-gl';

const Line = ({ points }) => {
  const lineData = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: points.map((point) => [point.longitude, point.latitude]),
    },
  };

  const lineLayer = {
    id: 'line-layer',
    type: 'line',
    paint: {
      'line-color': 'black',
      'line-width': 2,
    },
  };
  return (
    <>
      <Source type='geojson' data={lineData}>
        <Layer {...lineLayer} />
      </Source>
    </>
  );
};

export default Line;
