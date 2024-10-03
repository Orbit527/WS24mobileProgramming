import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import * as Speech from "expo-speech";

export default function SpeechField() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
	const lanuages = ["en", "fi", "sv"]; // This idea was kindly provided by ChatGPT, before I had an if, that would check the index and convert

  const speak = () => {
		Speech.speak(input, {language: lanuages[index]});
  };

  return (
    <View>
      <SegmentedControl
        style={styles.control}
        values={["English", "Finnish", "Swedish"]}
        selectedIndex={index}
        onChange={(event) => {
          setIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Type something here..."
        onChangeText={(text) => setInput(text)}
      />
      <Button title="Say it" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  control: {
    width: 200,
    marginBottom: 15,
  },
  textInput: {
    height: 40,
    width: 200,
    marginBottom: 15,
    padding: 4,
    borderColor: "gray",
    borderWidth: 1,
  },
});
