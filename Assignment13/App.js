import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Contacts from "./ContactsList";

export default function App() {
  return (
    <View style={styles.container}>
      <Contacts></Contacts>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
