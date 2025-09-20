import { Text, View, TextInput, StyleSheet,Image, FlatList, TouchableOpacity,StatusBar,SectionList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import { Drawer } from 'react-native-drawer-layout';
import AntDesign from '@expo/vector-icons/AntDesign';
import {ScrollView} from  "react-native";


const Data = [
  {
    id: '1',
    Titre: 'Titre 1 : je suis un long titre',
    url_cover: '../../assets/images/Couverture.png',
    Auteur: 'Auteur 1',
    Date:'1990',
    Genre:'Roman',
  },
  {
    id: '2',
    Titre: 'Titre 2: je suis un très très long titre de livre',
    url_cover: '../../assets/images/Couverture.png',
    Auteur: 'Auteur 2',
    Date:'1990',
    Genre:'Roman',
  },
  {
    id: '3',
    Titre: 'Titre 3: je suis un très très bon livre',
    url_cover: '../../assets/images/Couverture.png',
    Auteur: 'Auteur 3',
    Date:'1990',
    Genre:'Roman',
  },
  {
    id: '4',
    Titre: 'Titre 4',
    url_cover: '../../assets/images/Couverture.png',
    Auteur: 'Auteur 4',
    Date:'1990',
    Genre:'Roman',
  },
  {
    id: '5',
    Titre: 'Titre 5',
    url_cover: '../../assets/images/Couverture.png',
    Auteur: 'Auteur 5',
    Date:'1990',
    Genre:'Bande Dessinée',
  },
  {
    id: '6',
    Titre: 'Titre 6',
    url_cover: '../../assets/images/Couverture.png',
    Auteur: 'Auteur 6',
    Date:'2005',
    Genre:'Bande Dessinée',
  },
  {
    id: '7',
    Titre: 'Titre 7',
    url_cover: '../../assets/images/Couverture.png',
    Auteur: 'Auteur 7',
    Date:'2007',
    Genre:'Bande Dessinée',
  }
];

const filtres = [
  { label: 'Recherche', value: 'Recherche' },
  { label: 'Catégories', value: 'Categories' },
  { label: 'Etagères', value: 'Etageres' },
  { label: 'Tags', value: 'Tags' },
];
const genres = [
  {
    title:'Romans',
    data:[{
      key: 1,
      genre:'Roman',
    }]},
  {
    title:'Bandes Dessinées',
    data:[{
      key: 2,
      genre:'Bande Dessinée',
    }]
  },    
]
const ItemBis = ({item, onPress} : {item:any, onPress:any}) =>(
  <TouchableOpacity
    style = {{
      flex:1,
      //height:80,
    }}
    onPress={onPress}
    >
       
      <View style={styles.itembis}>
        <Image
            style={styles.couverturebis}
            source={require('../../assets/images/Couverture.png')}
        />
        <View style={styles.overlay}>
            <Text style={styles.titlebis}>{item.Titre}</Text>
        </View>
      </View>
  </TouchableOpacity>
);

const Item = ({title, auteur, date, onPress } : {title:any, auteur:any, date:any, onPress:any}) => (
  <TouchableOpacity
    style = {{
      flex:1,
      maxHeight:200,
    }}
    onPress={onPress}
    >
  <View style={styles.item}>
    <Image
        style={styles.couverture}
        source={require('../../assets/images/Couverture.png')}
    />
    <View style={{
      justifyContent: 'center',
      alignSelf:'flex-start',
      flex:1,
      }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.auteur}>{auteur}</Text>
        <Text style={styles.date}>{date}</Text>
    </View>
  </View>
  </TouchableOpacity>
);
const ItemDrawer = ({item}: {item:any}) => (
  <View>
    <Text style={styles.title}>{item.Titre}</Text>
    <Text style={styles.title}>{item.Auteur}</Text>
    <Text style={styles.title}>{item.Date}</Text>
  </View>
);


function HorizontalMenu({filtres, value, setValue } : {filtres:any, value:any, setValue:any}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: 10 }}
    >
      {filtres.map((item) => {
        const selected = value === item.value;
        return (
          <TouchableOpacity
            key={item.value}
            onPress={() => setValue(item.value)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 20,
              marginRight: 10,
              borderWidth: 1,
              borderColor: selected ? '#254b7f' : "#254b7f",
              backgroundColor: selected ? '#254b7f' : "white",
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: 'bold',color: selected ? "white" : "black" }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}


function ModeDropdown({ DropdownValue }: { DropdownValue: any }) {
  const [open, setOpen] = React.useState(false);
  const [itemDrawer, setItemDrawer] = React.useState(Data[0]);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerPosition="right"
      renderDrawerContent={() => {
        if (DropdownValue === "Recherche") {
          return <ItemDrawer item={itemDrawer} />;
        }
        if (DropdownValue === "Categories") {
          return <ItemDrawer item={itemDrawer} />;
        }
        return null;
      }}
    >
      {DropdownValue === "Recherche" && (
        <>
          <View style={styles.containerSearchBar}>
            <View style={styles.containerIcon}>
              <Ionicons name="search" size={30} />
            </View>
            <TextInput style={styles.searchBar} />
          </View>
          <FlatList
            data={Data}
            renderItem={({ item }) => (
              <Item
                onPress={() => {
                  setOpen(true); // ouvre le Drawer
                  setItemDrawer(item);
                }}
                title={item.Titre}
                auteur={item.Auteur}
                date={item.Date}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}

      {DropdownValue === "Categories" && (
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10,}}
          stickySectionHeadersEnabled={false}
          sections={genres}
          renderSectionHeader={({ section }) => (
            
            <View style={styles.ligneCategorie}>
              <Text style={styles.categorie}>
                {section.title}
              </Text>
              <FlatList
                horizontal
                data={Data.filter(
                  (item) => item.Genre == section.data[0].genre
                )}
                renderItem={({ item }) => (
                  <ItemBis
                    onPress={() => setOpen(true)} // ouvre le Drawer
                    item={item}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
          renderItem={() => null}
        />
      )}
    </Drawer>
  );
}

export default function LivresScreen() {
  const [value, setValue] = useState(filtres[0]?.value || null);
  const [isFocus, setIsFocus] = useState(false);


  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <View style={{paddingLeft : 10,}}>

        <HorizontalMenu filtres={filtres} value={value} setValue={setValue} />  
      </View>
     
        <ModeDropdown
          DropdownValue={value}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  dropdown: {
    height: 35,
    //borderColor: 'gray',
    backgroundColor:'#ffffff',
    //borderWidth: 0.5,
    //borderRadius: 8,
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
  searchBar: {
    fontSize: 24,
    flex:7,
    height: 50,
    marginRight:25,
    backgroundColor: 'white',

  },
  containerSearchBar:{
    width: '90%',
    borderRadius:50,
    backgroundColor: 'white',
    alignSelf:'center',
    //display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor:'#254b7f',
    borderWidth:1,
  },
  containerIcon:{
    marginLeft:10,
    flex:1,
  },
  item: {
    backgroundColor: 'white',
    padding: 9,
    marginHorizontal: 8,
    marginTop:8,
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Pour Android
  },
  title: {
    backgroundColor:'white',
    fontSize:20,
    fontWeight:'bold',
    color:'black',
  },
  couverture: {
    width:140,
    height: 160,
    resizeMode: 'contain',
  },
  auteur:{
    fontSize: 15,
    color: 'black',
    backgroundColor:'white',

  },
  date:{
    fontSize: 15,
    color: '#333333',
    backgroundColor:'white',
  },
  ligneCategorie:{
    paddingHorizontal:8,
    paddingBottom:8,
    marginBottom:8,
    backgroundColor: 'white',
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Pour Android

  },
  itembis: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    width:180,
    height:250,
  },
  titlebis: {
    fontSize:15,
    fontWeight:'bold',
    color:'black',
    marginHorizontal:8,
  },
  couverturebis: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0, // Place le texte en bas de l'image
    width: '100%',
    backgroundColor: 'rgba(186, 203, 230, 0.65)', // Noir transparent
    paddingVertical: 10, // Un peu d'espace autour du texte
    alignItems: 'center', // Centre le texte horizontalement
  },
  categorie: {
    fontSize: 20,
    color:'#254b7f',
    fontWeight:'500',
    marginBottom:8,
  },
});
