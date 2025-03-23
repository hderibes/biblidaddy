import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return(
    <Tabs
    screenOptions={{tabBarActiveTintColor:"#000000"}}
    >
      <Tabs.Screen name="index"
      options={{
        headerTitle:"IndexScreen header",
        headerLeft: () => <></>,
      }}
      />
      <Tabs.Screen name="livres"
      options={{
        headerTitle:"Livres",
        headerLeft: () => <></>,
        tabBarIcon:({focused, color}) =><Ionicons 
        name={focused ? "book" : "book-outline"}
        size={30}/>
      }}
      />
    </Tabs>
  );
}
