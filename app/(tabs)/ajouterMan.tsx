import { View, StyleSheet} from "react-native";
import { useLocalSearchParams } from "expo-router";
import{Link} from "expo-router"
import { Button, ButtonText } from "../../components/ui/button";
import { FormControl } from "../../components/ui/form-control"
import { Heading } from "../../components/ui/heading"
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { Text } from "../../components/ui/text"
import { VStack } from "../../components/ui/vstack"
import { useState } from "react";
// import {  } from "react-native-css-interop";

export default function AjouterManScreen() {
  const { isbn } = useLocalSearchParams();
  const [value, setValue] = useState(""); // État pour stocker la valeur
  
  return (
    <View style={styles.container}>
      <FormControl className="p-4 border rounded-lg border-outline-300">
        <VStack space="xl">
          <Heading className="text-typography-900">Info livre</Heading>
            <VStack space="xs">
              <Text className="text-typography-500">ISBN</Text>
              <Input
                
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                placeholder="787"
                value = {value}
                onChangeText = {(text) => setValue(text)} 
                />
              </Input>
            </VStack>
      <Button
          className="ml-auto"
          onPress={() => {
            console.log(value)
          }}
        >
          <ButtonText className="text-typography-0">Save</ButtonText>
      </Button>
      </VStack>
    </FormControl>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Link href={"/ajouter"}> Go to ajouter</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf:'center',
    marginTop:10,
  },
});