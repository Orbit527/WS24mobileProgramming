import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import RepositoryList from "./RepositoryList";
import { fetchRepositories } from "./api";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    fetchRepositories(keyword)
      .then((data) => {
        setRepositories(data.items);
        setKeyword("");
      }) //only save items, because we are only interested in them
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.normalText}
        placeholder="Type keyword here..."
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
      />
      <Button title="Search" onPress={handleFetch} disabled={loading} />
      <ActivityIndicator size="large" animating={loading}></ActivityIndicator>
      <RepositoryList repositories={repositories} />
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
  normalText: {
    fontSize: 24,
  },
});
