import { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({lat, long}) {

    return (
        <MapView
			style={{ width: '100%', height: '80%' }} 
			initialRegion={{
				latitude: lat,
                longitude: long,
				latitudeDelta: 0.0322,
				longitudeDelta: 0.0221,
			}} 
            
            region={{
				latitude: lat,
                longitude: long,
				latitudeDelta: 0.0322,
				longitudeDelta: 0.0221,
			}} 
            
		>
			<Marker
				coordinate={{
					latitude: lat,
					longitude: long,
				}}
				title="Haaga-Helia"
				description="This is Haaga-Helia Pasila Campus"
				pinColor="red"
			/>
		</MapView>
    );
}