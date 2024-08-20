import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import {StyleSheet, Text, View, Button, Alert, TextInput} from 'react-native';

export default function App() {

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState(0);

  const add = () => {
    setResult(Number(input1) + Number(input2));
  }

  const subtract = () => {
    setResult(Number(input1) - Number(input2));
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={styles.text}>Result: </Text>
        <Text style={styles.text} placeholder={"Result"}>{result}</Text>
        <TextInput
          style={styles.textInputField}
          placeholder={"Enter first number"}
          onChangeText={input1 => setInput1(parseInt(input1))}
          keyboardType={"numeric"}
        />
        <TextInput
          style={styles.textInputField}
          placeholder={"Enter second number"}
          onChangeText={input2 => setInput2(parseInt(input2))}
          keyboardType={"numeric"}
        />
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around'}}>
        <Button title="Add" onPress={add} color={"blue"}/>
        <Button title="Subtract" onPress={subtract} color={"blue"}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  textInputField: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
