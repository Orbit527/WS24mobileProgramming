import * as SQLite from "expo-sqlite";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ShoppingList from "./ShoppingList";

export default function App() {
  const db = SQLite.openDatabaseSync("shoppingdb");

  const initializeDB = async () => {
    try {
      await db.execAsync(`
          CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL, title TEXT, amount TEXT);
        `);
    } catch (error) {
      console.error("Could not open database", error);
    }
  };

  useEffect(() => {
    initializeDB();
  }, []);

  return (
    <View style={styles.container}>
      <SQLiteProvider
        databaseName="shoppingdb"
        onInit={initializeDB}
        onError={(error) => console.error("Could not open database", error)}
      >
        <ShoppingList />
      </SQLiteProvider>

      <StatusBar style="auto" />
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
});
