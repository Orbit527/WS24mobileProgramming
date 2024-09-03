import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { styles } from '../stylesheets/Stylesheet';

export default function Home({ navigation }) {

  const [input1, setInput1] = useState();
  const [input2, setInput2] = useState();
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);

  const calculate = (operation) => {
    const num1 = Number(input1);
    const num2 = Number(input2);

    if (isNaN(input1) || input1 === "" || isNaN(input2) || input2 === "") {
      Alert.alert("Please enter only numbers!");
    } else if (operation == "add") {
      const result = num1 + num2;
      setResult(result);
      setHistory([input1 + " + " + input2 + " = " + result, ...history]);
    } else if (operation == "sub") {
      const result = num1 - num2;
      setResult(result);
      setHistory([input1 + " - " + input2 + " = " + result, ...history]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
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
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around' }}>
        <Button title="Add" onPress={() => calculate('add')} color={"blue"} />
        <Button title="Subtract" onPress={() => calculate('sub')} color={"blue"} />
        <Button title="History" onPress={() => navigation.navigate("History", { history: history })} color={"blue"}></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

