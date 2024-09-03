import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Alert, TextInput, FlatList} from 'react-native';

export default function History({ route }) {
    const {history} = route.params;


    return(
        
        <View style={{flex: 2, flexDirection: 'col', alignItems: 'center'}}>
        <Text style={styles.text}>History</Text>
        <FlatList 
          style={{width: "100"}}
          data={history}
          renderItem={({item}) =>
            <Text style={styles.text}>{item}</Text>
          }
          ListEmptyComponent={<Text style={styles.text}>No calculations yet...</Text>}
        />
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