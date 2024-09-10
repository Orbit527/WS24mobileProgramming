import { Text, FlatList, View, Image, StyleSheet } from "react-native";
import MealsListItem from "./MealsListItem.js";

export default function MealsList({ meals }) {
  return (
    <FlatList
			style={{marginTop: 20}}
      data={meals}
      renderItem={({ item }) => (
        <MealsListItem title={item.strMeal} image={item.strMealThumb}></MealsListItem>
      )}
    />
  );
}

