
'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for default icon issue with Leaflet and Webpack
const icon = L.icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const RecenterAutomatically = ({lat,lng}: {lat:number, lng:number}) => {
    const map = useMap();
     useEffect(() => {
       map.setView([lat, lng]);
     }, [lat, lng, map]);
     return null;
}

export default function Map({location}: {location: {latitude: number, longitude: number}}) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    
    if (!isClient) {
        return null;
    }

    return (
        <MapContainer center={[location.latitude, location.longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.latitude, location.longitude]} icon={icon}>
                <Popup>
                    You are here.
                </Popup>
            </Marker>
            <RecenterAutomatically lat={location.latitude} lng={location.longitude} />
        </MapContainer>
    )
}
