import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";

export default function App() {
  const [convertedNumber, setConvertedNumber] = useState(0);
  const [inputNumber, setInputNumber] = useState();
  const [pickerValue, setPickerValue] = useState(""); //TODO: set to something useful
  const [rates, setRates] = useState([]);
  
  useEffect(() => {
    handleFetch();
  }, []);

  const convertCurrencies = () => {
    console.log(pickerValue);
    console.log(inputNumber);

    setConvertedNumber(pickerValue * inputNumber);
  }

  const handleFetch = () => {

    var headers = new Headers();
    headers.append("apikey", "qq72wdHSYFxBGJ70zNchvcFtRPnAnl5l");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: headers,
    };

    fetch(
      "https://api.apilayer.com/exchangerates_data/latest?symbols=&base=EUR",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const ratesArray = Object.entries(result.rates);
        setRates(ratesArray);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.container}>

      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        <Image source={{uri: "https://attic.sh/m20atdf7l3sdb0zyv1qecjzotf05"}}
          style={{width: 200, height: 200}}
        />
        <Text style={styles.standardText}>{convertedNumber} €</Text>
      </View>

      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Amount..."
          value={inputNumber}
          onChangeText={(text) => setInputNumber(text)}
        />

        <Picker
          selectedValue={pickerValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setPickerValue(itemValue);
            }
          }
        > 
        {
          rates.map(([currency, rate]) => (
            <Picker.Item key={currency} label={currency} value={rate}/>
          ))
        }
        </Picker>

      </View>

      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        <Button title="Convert" onPress={convertCurrencies}/>
        <Button title="Reload Data" onPress={handleFetch}/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  standardText: {
    fontSize: 28,
  }, 
  textInput: {
    borderBottomWidth: 1,
    fontSize: 18,
    padding: 10,
    width: 140,
  },
  picker: { 
    width: 140,
    height: 60,
  }
});
