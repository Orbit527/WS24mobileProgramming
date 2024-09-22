import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Map from './Map';
import { useState } from 'react';

export default function App() {

  const [inputText, setInputText] = useState("");
  const [coordinateResult, setCoordinateResult] = useState({lat: 60.200692, long: 24.934302});
 
  const send = () => {
    
    const encodedString = encodeURIComponent(inputText).replace(/%20/g, "+").replace(/\+/g, "%2B"); //from ChatGPT, TODO: improve replacing of string
    //console.log(encodedString);

    fetch(`${process.env.EXPO_PUBLIC_API_URL}json?address=${encodedString}&key=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch:" + response.statusText);
        
      return response.json()
    })
    .then(data => {
      setCoordinateResult({lat: data.results[0].geometry.location.lat, long: data.results[0].geometry.location.lng});
      //console.log(data);
    })
    .catch(err => console.error(err));    
  }

  return (
    <View style={styles.container}>
      <Map 
        lat={coordinateResult.lat} 
        long={coordinateResult.long}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Write here...'
        onChangeText={text => setInputText(text)}
      />
      <Button
        title='Send'
        onPress={send}
      />
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
  textInput: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    height: 40,
    width: 200,
    fontSize: 16,
    marginBottom: 10,
  }
});
