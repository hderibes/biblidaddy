import { Text, View, TextInput, StyleSheet,Image, FlatList, TouchableOpacity,StatusBar,SectionList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import { Drawer } from 'react-native-drawer-layout';
import AntDesign from '@expo/vector-icons/AntDesign';


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
  { label: 'Catégorie', value: 'Categorie' },
  { label: 'Filtre 3', value: 'Tags' },
  { label: 'Filtre 4', value: 'Année' },

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
      maxHeight:150,
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
      width:'63%',
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

function ModeDropdown({ DropdownValue } : {DropdownValue:any}) {
  const [open, setOpen] = React.useState(false);
  const [itemDrawer, setItemDrawer] = React.useState(Data[0]);
  if (DropdownValue == 'Recherche') {
    return(
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerPosition='right'
        renderDrawerContent={() => {
          return (
            <ItemDrawer
              item = {itemDrawer}
            />
          );
        }}>

      <View style={styles.containerSearchBar}>
        <View style={styles.containerIcon}>
          <Ionicons name="search" size={30}/>
        </View>
        <TextInput
          //onChangeText={(search) => this.setState({search})}
          style={styles.searchBar}/>
      </View>
      <FlatList
        data={Data}
        renderItem={({item}) =>
          <Item
            onPress={() => {
              setOpen((prevOpen) => !prevOpen); //ouvre le Drawer
              setItemDrawer(() => item);
            }}
            title={item.Titre} auteur={item.Auteur} date={item.Date}
          />}
        keyExtractor={(item) => item.id}
      />
      </Drawer>    
    );
  }
  if (DropdownValue == 'Categorie'){
    return(
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => {
          return <Text>Drawer content</Text>;
        }}
        >
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={genres}
          renderSectionHeader={({ section }) => (
            <>
            <Text style={{color:'white', fontSize: 30}}>{section.title}</Text>
            <FlatList
              horizontal
              data={Data.filter(item => item.Genre == section.data[0].genre)}
              renderItem={({item}) =>
                <ItemBis
                  onPress={() => setOpen((prevOpen) => !prevOpen)} // Ouvre le drawer
                  item={item}
                />}
                showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
            />
            </>
          )}
          renderItem={() => null}
        /> 
        </Drawer>
      );
  }
  
}

export default function LivresScreen() {
  const [value, setValue] = useState(null);
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
        
      <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={filtres}
          //search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          /*renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}*/
        />
        <ModeDropdown
          DropdownValue={value}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
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
  },
  containerIcon:{
    marginLeft:10,
    flex:1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    width:'100%',
  },
  title: {
    backgroundColor:'white',
    paddingLeft: 10,
    fontSize:20,
    color:'black',
  },
  couverture: {
    width:100,
    height: 120,
    resizeMode: 'contain',
  },
  auteur:{
    fontSize: 15,
    paddingLeft:10,    
    color: 'blue',
    backgroundColor:'white',
  },
  date:{
    fontSize: 12,
    paddingLeft:10,    
    color: 'grey',
    backgroundColor:'white',
  },
  itembis: {
    backgroundColor: '#f9c2ff',
    marginHorizontal: 10,
    width:130,
   // justifyContent:'flex-start',
    height:180,
  },
  titlebis: {
    fontSize:15,
    fontWeight:'bold',
    color:'white',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Noir transparent
    paddingVertical: 10, // Un peu d'espace autour du texte
    alignItems: 'center', // Centre le texte horizontalement
  },

});
