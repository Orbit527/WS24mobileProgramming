import { Text, FlatList, View, Image } from "react-native";

export default function MealsListItem({ title, image }) {
  return (
    <View>
      <Text style={{fontSize: 20}}>{title}</Text>
      <Image
        style={{ width: 40, height: 40 }}
        source={{
          uri: image,
        }}
      ></Image>
    </View>
  );
}
