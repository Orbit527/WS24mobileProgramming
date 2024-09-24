import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, onValue, push, ref } from 'firebase/database';

const database = getDatabase(app); //can also include in firebaseConfig and export the database

export default function App() {

  const [product, setProduct] = useState({
    title: "",
    amount: ""
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "/items");
    onValue(itemsRef, (snapshot) => {
      data = snapshot.val();
      setProducts(Object.values(data)); //take data and convert object to array
      //TODO: loop though with a map and add key to data 
      console.log(data);
    });
  }, [])

  const handleSave = () => {
    push(ref(database, "/items"), product); //collection is items
  }

  return (
    <View style={styles.container}>
      
      <TextInput 
        placeholder='Product Title'
        value={product.title}
        onChangeText={text => setProduct({...product, title: text})} //...product will keep other properties
      />
      <TextInput 
        placeholder='Amount'
        value={product.amount}
        onChangeText={text => setProduct({...product, amount: text})}
      />
      <Button 
        title='Save Product'
        onPress={handleSave}
      />
      <FlatList 
        data={products}
        renderItem={ ({item}) => 
          <View style={{flexDirection: "row", margin: 8}}>
              <Text>{item.title}</Text>
              <Text>{item.amount}</Text>
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
    backgroundColor: '#fff',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
