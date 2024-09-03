import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Alert, TextInput, FlatList} from 'react-native';
import Calculator from './screens/Calculator';
import History from './screens/History';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator}/>
        <Stack.Screen name="History" component={History}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


