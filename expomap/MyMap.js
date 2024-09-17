import MapView, { Marker } from "react-native-maps";

export default function MyMap() {
  return ( 
		<MapView
			style={{ width: '100%', height: '100%' }} 
			initialRegion={{
				latitude: 60.200692,
				longitude: 24.934302,
				latitudeDelta: 0.0322,
				longitudeDelta: 0.0221,
			}} 
		>
			<Marker
				coordinate={{
					latitude: 60.200692,
					longitude: 24.934302,
				}}
				title="Haaga-Helia"
				description="This is Haaga-Helia Pasila Campus"
				pinColor="blue"
			/>
		</MapView>
	);
}
