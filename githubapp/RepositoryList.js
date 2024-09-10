import { Text, View, FlatList} from "react-native";

export default function RepositoryList( {repositories} ) {



  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => (
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {item.full_name}
          </Text>
          <Text style={{ fontSize: 18 }}>{item.description}</Text>
        </View>
      )}
    />
  );
}
