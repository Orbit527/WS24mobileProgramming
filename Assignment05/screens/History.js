import { FlatList, Text, View } from 'react-native';
import { styles } from '../stylesheets/Stylesheet';

export default function History({ route }) {
	const { history } = route.params;

	return (
		<View style={{ flex: 2, flexDirection: 'col', alignItems: 'center' }}>
			<Text style={styles.text}>History</Text>
			<FlatList
				style={{ width: "100" }}
				data={history}
				renderItem={({ item }) =>
					<Text style={styles.text}>{item}</Text>
				}
				ListEmptyComponent={<Text style={styles.text}>No calculations yet...</Text>}
			/>
		</View>
	);
}
