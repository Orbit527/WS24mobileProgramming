import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MealsList from './MealsList';
import { fetchMeals } from './api';

export default function App() {

  const [keyword, setKeyword] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    fetchMeals(keyword)
      .then((data) => {
        setMeals(data.meals);
        setKeyword("");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }


  return (
    <View style={styles.container}>
      <TextInput
        style={{fontSize: 20}}
        placeholder="Search for a meal..."
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
      />
      <Button title="Search" onPress={handleFetch} disabled={loading}></Button>
      
      {loading && <ActivityIndicator size="large" /> }

      <MealsList meals={meals}/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    margin: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
