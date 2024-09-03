import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home';
import Settings from './screens/settings';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator(); // returns a react component (therefore it is named with capital letter)

export default function App() {
  return (
      <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({  // Navigator can be customized using screenOptions
              tabBarIcon: ({ focused, color, size }) => { 
              // Function tabBarIcon is given the focused state,
              // color and size params
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Settings') {
                iconName = 'settings';
              }

              return <Ionicons name={iconName} size={size} color={color} />;   //it returns an icon component
            },
          })}
          >
          <Tab.Screen name='Home' component={Home} options={{ tabBarBadge: 1 }}/>
          <Tab.Screen name='Settings' component={Settings}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const person = {name: "Juha", email: "juha@mail.com"};

const {name} = person;