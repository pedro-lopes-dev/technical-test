import React from 'react';
import * as L from 'react-leaflet';

const Markers = ({ users }) => {
  const map = L.useMap();

  React.useEffect(() => {
    const fitAllMarkers = () => {
      const markers = [];
      users?.forEach((user) => {
        markers.push([user?.address?.geo?.lat, user?.address?.geo?.lng]);
      });
      if (!!markers?.length) {
        map.fitBounds(markers);
      }
    };
    fitAllMarkers();
  }, [users, map]);

  return (
    <>
      {users?.map((user) => (
        <L.Marker
          key={user?.id}
          position={[user?.address?.geo?.lat, user?.address?.geo?.lng]}
        >
          <L.Popup>{user?.name}</L.Popup>
        </L.Marker>
      ))}
    </>
  );
};

const Map = ({ users }) => (
  <L.MapContainer
    className="map-container"
    zoom={13}
    scrollWheelZoom={false}
  >
    <L.TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Markers users={users} />
  </L.MapContainer>
);

export default Map;
