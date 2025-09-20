import { Text, View, TextInput, StyleSheet,Image, FlatList, TouchableOpacity,StatusBar,SectionList } from 'react-native';
import{Link} from "expo-router"
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';

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

const Item = ({title, auteur, date, onPress } : {title:any, auteur:any, date:any, onPress:any}) => (
  <TouchableOpacity
    style = {{
      flex:1,
      maxHeight:150,
    }}
    onPress={onPress}
    >
    <View style={styles.cardShadow}>
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
  </View>
  </TouchableOpacity>
);
export default function RechercherScreen() {
    const [open, setOpen] = useState(false);
    const [itemDrawer, setItemDrawer] = useState(Data[0]);
  return (
    <>
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
              console.log(open);
            }}
            title={item.Titre} auteur={item.Auteur} date={item.Date}
          />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}


const styles = StyleSheet.create({
    containerSearchBar:{
        width: '90%',
        borderRadius:50,
        backgroundColor: 'white',
        alignSelf:'center',
        //display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:3,
      },
    searchBar: {
        fontSize: 24,
        flex:7,
        height: 50,
        marginRight:25,
        backgroundColor: 'white',
    
      },
      containerIcon:{
        marginLeft:10,
        flex:1,
      },
    item: {
        backgroundColor: '#ffffff',
        padding: 9,
        margin: 16,
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Pour Android
      },
      title: {
        //backgroundColor:'white',
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

});