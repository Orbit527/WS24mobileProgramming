import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";


export default function Map({lat = 0, long = 0, searchLat = 0, searchLong = 0}) {

    console.log(searchLat, searchLong);

    return (
        <MapView
            style={{ width: '100%', height: '80%' }} 
            initialRegion={{
                latitude: 60.200692,
                longitude: 24.934302,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
            }} 
            
            region={{
                latitude: searchLat,
                longitude: searchLong,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
            }} 
        >
			<Marker
				coordinate={{
					latitude: lat,
					longitude: long,
				}}
				title="My Location"
				pinColor="blue"
			/>
        </MapView>
    );
}

