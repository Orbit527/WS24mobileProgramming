import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import {StyleSheet, Text, View, Button, Alert, TextInput} from 'react-native';

export default function App() {

  const [msg, setMsg] = useState("");

  const handlePress = () => {
    Alert.alert("You typed:", msg);
    console.log("Hello!");
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Write something here"}
        onChangeText={text => setMsg(text)}
        keyboardType={"numeric"}
      />
      <Button title="Hello" onPress={handlePress} color={"green"}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "blue"
  }
});
