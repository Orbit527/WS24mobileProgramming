import { Text } from "react-native";
import { styles } from './Stylesheet'

export default function EmptyListComponent() {
    return (
        <Text style={styles.standardtext}>No tasks to do...</Text>
    );
}