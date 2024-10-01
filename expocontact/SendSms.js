import { Button, Text, View } from "react-native";
import * as Contacts from "expo-contacts";
import * as SMS from "expo-sms";
import { useState } from "react";

export default function SendSms() {
  const [contact, setContact] = useState({});

  const getContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        //because there can be no contacts in the phone
        setContact(data[0]);
      }
    }
  };

  const sendSMS = async () => {
    const isSMSavailable = await SMS.isAvailableAsync(); // Tablets for ex. dont have SIM cards, therefore check beforehand

    if (isSMSavailable) {
			await SMS.sendSMSAsync([contact.phoneNumbers[0].number], `Hello ${contact.firstName}! How are you doing?`);
    }
  };

  return (
    <View>
			<Text>{contact.name}</Text>
      <Button title="Get Contact" onPress={getContact} />
      <Button title="Send SMS" onPress={sendSMS} />
    </View>
  );
}
