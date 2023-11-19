'use client';

import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Coordinates = [number, number];

interface ActivityProps {
  multiPolyline: Coordinates[] | null;
}

export default function Activity({ multiPolyline }: ActivityProps) {
  const redOptions = { color: 'red' };

  return (
    <MapContainer center={[37.56, 126.91]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {multiPolyline && (
        <Polyline pathOptions={redOptions} positions={multiPolyline} />
      )}
    </MapContainer>
  );
}
