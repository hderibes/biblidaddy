import { Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
import { useNavigationState } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const pathname = usePathname();
  const isAjouterActive = pathname.startsWith("/ajouter");

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#000000",
      tabBarStyle: {
        backgroundColor:'white',
        height: 50,
        width:'70%',

        borderRadius: 50,
        borderColor: 'white',
        borderTopColor: 'white',
        elevation: 0,         // Android : supprime l'ombre
        shadowOpacity: 0,     // iOS : supprime l'ombre

        borderTopWidth: 0,
        position: 'absolute',
        bottom: 2,
        marginLeft:(screenWidth*0.3)/2,
        },
        }}>
      <Tabs.Screen name="index"
        options={{
          href: null,
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
      <Tabs.Screen name="ajouter"
        options={{
          headerShown:false,
          headerLeft: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={isAjouterActive ? "add-circle" : "add-circle-outline"} size={30} />
          ),
        }}
      />
      <Tabs.Screen name="profil"
        options={{
          headerShown:false,
          headerLeft: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={30} />
          ),
        }}
      />
      
      <Tabs.Screen name="ajouterMan" options={{
          headerShown:false,
          href: null
        }}
      />
    </Tabs>
    </SafeAreaView>
  );
}
