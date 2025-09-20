import { View, StyleSheet} from "react-native";
import { useLocalSearchParams } from "expo-router";
import{Link} from "expo-router"
import { Button, ButtonText } from "../../components/ui/button";
import { FormControl } from "../../components/ui/form-control"
import { Heading } from "../../components/ui/heading"
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { Text } from "../../components/ui/text"
import { Dropdown } from "react-native-element-dropdown"
import { VStack } from "../../components/ui/vstack"
import { useState } from "react"
import {ScrollView} from  "react-native";

 const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];




export default function AjouterManScreen() {
  const { isbn } = useLocalSearchParams();
  const [infoIsbn, setInfoIsbn] = useState(isbn ? isbn : "" ); // État pour stocker la valeur
  const [infoTitre, setInfoTitre] = useState(""); // État pour stocker la valeur
  const [infoAuteur, setInfoAuteur] = useState(""); // État pour stocker la valeur
  const [infoAnnee, setInfoAnnee] = useState(""); // État pour stocker la valeur
  const [infoTags, setInfoTags] = useState(""); // État pour stocker la valeur
  const [infoEtagere, setInfoEtagere] = useState(""); // État pour stocker la valeur
  const [infoLangue, setInfoLangue] = useState(""); // État pour stocker la valeur

  const [infoCategorie, setInfoCategorie] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <ScrollView>
    <View style={styles.container}>
      <FormControl className="p-4 border rounded-lg border-outline-300">
        <VStack space="xl">
          <Heading className="text-typography-900">Info livre</Heading>
            <VStack space="xs">
              <Text className="text-typography-500">ISBN</Text>
              <Input
                style={styles.inputText}
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                placeholder="787"
                value = {infoIsbn}
                onChangeText = {(text) => setInfoIsbn(text)} 
                />
              </Input>

              <Text className="text-typography-500">Titre</Text>
              <Input
                style={styles.inputText}                
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                placeholder="Titre"
                value = {infoTitre}
                onChangeText = {(text) => setInfoTitre(text)} 
                />
              </Input>
              <Text className="text-typography-500">Auteur</Text>

              <Input
                style={styles.inputText}
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                placeholder="Auteur"
                value = {infoAuteur}
                onChangeText = {(text) => setInfoAuteur(text)} 
                />
              </Input>
              <Text className="text-typography-500">Année</Text>

                <Input
                style={styles.inputText}
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                placeholder="Année de parution"
                value = {infoAnnee}
                onChangeText = {(text) => setInfoAnnee(text)} 
                />
              </Input>
              <Text className="text-typography-500">Catégorie</Text>

               <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: '#254b7f' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Catégorie' : '...'}
                  searchPlaceholder="Rechercher..."
                  value={infoCategorie}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setInfoCategorie(item.value);
                    setIsFocus(false);
                  }}
                />
                
            </VStack>
      <Button
          style={{backgroundColor:'#254b7f'}}
          className="ml-auto"
          onPress={() => {
            console.log(infoIsbn + " " + infoTitre + " " + infoCategorie)
          }}
        >
          <ButtonText className="text-typography-0">Ajouter</ButtonText>
      </Button>
      <View style={{height: 400,}}></View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf:'center',
    marginTop:10,
  },
  inputText:{
    borderColor: '#254b7f',
  },
  dropdown: {
    height: 40,
    borderColor: '#254b7f',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});