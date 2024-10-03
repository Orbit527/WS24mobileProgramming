import { Button, FlatList, Text, View } from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

export default function ContactsList() {
  const [contacts, setcontacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        // name: "",
      });

      if (data.length > 0) {
        setcontacts(data);
      }

      console.log(data);
    }
  };

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <Text>
            {item.firstName} {item.lastName} {item.phoneNumbers[0].number ? item.phoneNumbers[0].number : "No number available"}
          </Text>
        )}
      />
      <Button title="Get Contacts" onPress={getContacts} />
    </View>
  );
}
