import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SendSms from "./SendSms";

export default function App() {
  return (
    <View style={styles.container}>
      <SendSms></SendSms>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
