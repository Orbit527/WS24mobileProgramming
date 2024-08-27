import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import EmptyListComponent from './EmptyListComponent';
import {useState} from 'react';
import { styles } from './Stylesheet'

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handlePress = () => {
    setTodos([todo, ...todos]);
    setTodo("");
    //console.log(todos)
  }

  const clear = () => {
    setTodos([]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputComponents}>
      <TextInput
        style={styles.standardtext}
          placeholder="Enter a new task..."
          onChangeText={text => setTodo(text)}
          value={todo}
      />
      <View style={{flex: 0, flexDirection: "row", justifyContent: "center"}}>
        <Button title="Add" onPress={handlePress}/>
        <Button title="Clear" onPress={clear}/>
      </View>
      </View>
      <Text style={styles.headerText}>Shopping List</Text>
      <FlatList
        style={{width: "100"}}
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
