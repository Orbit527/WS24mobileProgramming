import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ShoppingList() {
  const [product, setProduct] = useState({
    title: "",
    amount: "",
  });
  const [products, setProducts] = useState([]);

  const db = useSQLiteContext();

  const updateList = async () => {
    try {
      const list = await db.getAllAsync("SELECT * FROM items");
      console.log(list);
      setProducts(list);
    } catch (error) {
      console.error("Could not get item", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await db.runAsync(`DELETE FROM items WHERE id=?`, id);
      await updateList();
    } catch (error) {
      console.log("Could not delete item", error);
    }
  };

  useEffect(() => {
    updateList();
  }, []);

  const saveItem = async () => {
    try {
      await db.runAsync(
        "INSERT INTO items VALUES (?, ?, ?)",
        null,
        product.title,
        product.amount
      );
      await updateList();
    } catch (error) {
      console.error("Could not add item", error);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.inputText}
        placeholder="Product"
        value={product.title}
        onChangeText={(text) => setProduct({ ...product, title: text })} //...product will keep other properties
      />
      <TextInput
        style={styles.inputText}
        placeholder="Amount"
        value={product.amount}
        onChangeText={(text) => setProduct({ ...product, amount: text })}
      />
      <Button title="Save Product" onPress={saveItem} />
      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 20 }}>
        Shopping List
      </Text>
      <FlatList
        style={styles.list}
        data={products}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "left",
              margin: 8,
            }}
          >
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.amount}</Text>
            <Text
              style={{ fontSize: 18, color: "blue" }}
              onPress={() => deleteItem(item.id)}
            >
              Delete
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    fontSize: 20,
    textAlign: "center",
    height: 40,
    width: 160,
    marginBottom: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  list: {
    marginTop: 10,
    width: "70%",
  },
  text: {
    fontSize: 18,
  },
});
