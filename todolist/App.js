import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import EmptyListComponent from './EmptyListComponent';
import {useState} from 'react';

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handlePress = () => {
    setTodos([todo, ...todos]);
    setTodo("");
    //console.log(todos)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputComponents}>
      <TextInput
        style={styles.standardtext}
          placeholder="Enter a new task"
          onChangeText={text => setTodo(text)}
          value={todo}
      />
      <Button title="ADD TODO" onPress={handlePress}/>
      </View>
      <FlatList
        style={{width: "80%"}}
        data={todos}
        renderItem={({item}) => 
          <View style={styles.listItem}>
            <Text style={styles.standardtext}>{item}</Text>
          </View>
        }
        ListEmptyComponent={EmptyListComponent}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  standardtext: {
    fontSize: 20,
  }, 
  inputComponents:{
    width: "90%",
  }, 
  listItem: {
    backgroundColor: 'lightblue',
    borderRadius: 20,
    padding: 30,
    marginTop: 5,
  }
});