import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { styles } from "../StyleSheet.js"

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Home" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="titleLarge">Home</Text>
      </View>
    </View>
  );
}
