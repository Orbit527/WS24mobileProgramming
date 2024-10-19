import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Home from "./Screens/Home";
import Settings from "./Screens/Settings";
import Routes from "./Screens/Routes";
import Track from "./Screens/Track";
import Profile from "./Screens/Profile";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => {
                return <Icon name="home" size={24} color={"black"} />;
              },
            }}
          />
          <Tab.Screen
            name="Routes"
            component={Routes}
            options={{
              tabBarLabel: "Routes",
              tabBarIcon: ({ color, size }) => {
                return <Icon name="routes" size={24} color={"black"} />;
              },
            }}
          />
          <Tab.Screen
            name="Track"
            component={Track}
            options={{
              tabBarLabel: "Track",
              tabBarIcon: ({ color, size }) => {
                return <Icon name="play" size={24} color={"black"} />;
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => {
                return <Icon name="account" size={24} color={"black"} />;
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => {
                return <Icon name="cog" size={24} color={"black"} />;
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}
