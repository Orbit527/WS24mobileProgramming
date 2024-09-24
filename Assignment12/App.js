import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, onValue, push, ref, remove } from 'firebase/database';

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
      //setProducts(Object.values(data)); //take data and convert object to array
      //TODO: loop though with a map and add key to data 
      console.log(data);

      const newData = Object.entries(data).map(([key, {title, amount }]) => (
        {
          "key":key, 
          "title":title, 
          "amount":amount,
        }
      ));

      console.log(newData);

      setProducts(newData);

    });
  }, [])

  const handleSave = () => {
    push(ref(database, "/items"), product); //collection is items
  }

  const deleteEntry = async (key) => {

    remove(ref(database, 'items/' + key));

    console.log(key);
  }

  return (
    <View style={styles.container}>
      
      <TextInput 
        style={styles.inputText}
        placeholder='Product'
        value={product.title}
        onChangeText={text => setProduct({...product, title: text})} //...product will keep other properties
      />
      <TextInput 
        style={styles.inputText}
        placeholder='Amount'
        value={product.amount}
        onChangeText={text => setProduct({...product, amount: text})}
      />
      <Button 
        title='Save Product'
        onPress={handleSave}
      />
      <Text style={{fontSize: 22, fontWeight: "bold", marginTop: 20}}>Shopping List</Text>
      <FlatList 
        style={styles.list}
        data={products}
        renderItem={ ({item}) => 
          <View style={{flexDirection: "row", justifyContent: 'space-around', alignItems: 'left', margin: 8}}>
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.text}>{item.amount}</Text>
              <Text
                style={{fontSize: 18, color: "blue"}} 
                onPress={() => deleteEntry(item.key)} 
              >Delete</Text>
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
  inputText: {
    fontSize: 20,
    textAlign: "center",
    height: 40,
    width: 160,
    marginBottom: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  }, 
  list: {
    marginTop: 10,
    width: "70%",
  }, 
  text: {
    fontSize: 18,
  }
});
