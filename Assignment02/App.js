import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [curNumber, setCurNumber] = useState(0);
  const [guesses, setGuesses] = useState(1);
  const [text, setText] = useState("Guess a number between 0 - 100");

  const initialize = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setText("Guess a number between 0 - 100");
    setGuesses(1)
  }

  const makeGuess = () => {
    if (isNaN(curNumber)) {
      setText("Input must be a number!");
    }
    else {
      if (Number(curNumber) == Number(randomNumber)) {
        Alert.alert("You guessed the number in " + guesses + " guesses!");
        initialize()
      } else if (Number(curNumber) < Number(randomNumber)) {
        setText("Your guess " + curNumber + " is too low");
        setGuesses(guesses + 1);
      } else {
        setText("Your guess " + curNumber + " is too high");
        setGuesses(guesses + 1);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TextInput 
        style={styles.textInputField} 
        placeholder="Enter a number" 
        keyboardType={"numeric"} 
        onChangeText={number => setCurNumber(parseInt(number))}></TextInput>
      <Button title='Make guess' onPress={makeGuess}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputField: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  }, text: {
    fontSize: 18,
  },
});
