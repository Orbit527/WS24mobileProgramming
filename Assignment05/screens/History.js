import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Alert, TextInput, FlatList} from 'react-native';

export default function History({ route }) {
    const {test} = route.params;


    return(
        <Text>History {test} </Text>
    );
}