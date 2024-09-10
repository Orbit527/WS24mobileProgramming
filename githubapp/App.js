import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";

export default function App() {

  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    fetch(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response => { //then takes a function as an argument
      if (!response.ok)
        throw new Error("Something went wrong!" + response.statusText);
      
      setKeyword("");
      return response.json();
    })
    .then(data => setRepositories(data.items)) //only save items, because we are only interested in them
    .catch(err => console.error(err))
    .finally(() => setLoading(false))
  }



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.normalText}
        placeholder="Type keyword here..."
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <Button title="Search" onPress={handleFetch} disabled={loading}/>
      <ActivityIndicator size="large" animating={loading}></ActivityIndicator>
      <FlatList
        data={repositories}
        renderItem={({item}) => 
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {item.full_name}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {item.description}
            </Text>
          </View>
        }
      />
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
  }
});
