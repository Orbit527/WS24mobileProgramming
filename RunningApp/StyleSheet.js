import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    margin: 20,
    //alignItems: "center",
    //justifyContent: "center",
  },
  cardFlexBox: {
flex: 1
  },
  cardFlexBoxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  card: {
    flex: 1,
    width: "50%",
    height: 65,
    margin: 5,
    justifyContent: "space-around",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "50%",
    height: 50,
    justifyContent: "center",
  }
});
