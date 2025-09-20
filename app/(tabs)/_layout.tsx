import { Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";

export default function TabsLayout() {
  const pathname = usePathname();
  const isAjouterActive = pathname.startsWith("/ajouter");

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#000000" }}>
      <Tabs.Screen name="index"
        options={{
          headerTitle: "IndexScreen header",
          headerLeft: () => <></>,
        }}
      />
      <Tabs.Screen name="livres"
        options={{
          headerShown:false,
          headerLeft: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={30} />
          ),
        }}
      />
      <Tabs.Screen name="rechercher"
        options={{
          headerShown:false,
          headerLeft: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={30} />
          ),
        }}
      />
      <Tabs.Screen name="ajouter"
        options={{
          headerShown:false,
          headerLeft: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={isAjouterActive ? "add-circle" : "add-circle-outline"} size={30} />
          ),
        }}
      />
      <Tabs.Screen name="ajouterMan" options={{href: null}} />
    </Tabs>
  );
}
