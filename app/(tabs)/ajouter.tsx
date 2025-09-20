import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View,  Vibration } from 'react-native';
import { useState, useEffect  } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { navigate } from 'expo-router/build/global-state/routing';
import { Link, router} from 'expo-router';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

//https://data.bnf.fr/sparql/
//https://www.data.gouv.fr/fr/dataservices/api-sparql-de-la-bnf-data-bnf-fr/
const fetchBookInfo = async ({isbn}:{isbn:string}) => {
  const sparqlQuery = `
    PREFIX bnf-onto: <http://data.bnf.fr/ontology/bnf-onto/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX rdarelationships: <http://rdvocab.info/RDARelationshipsWEMI/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT DISTINCT ?work ?title ?name
    WHERE {
      ?work rdfs:label ?title; dcterms:creator ?creator.
      ?manifestation bnf-onto:isbn '2-7028-4777-3' ;
      rdarelationships:workManifested ?work.
      ?creator foaf:name ?name.
    } LIMIT 10
  `;

  const url = `https://data.bnf.fr/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Résultats :", data.results.bindings);
  } catch (error) {
    console.error("Erreur API BnF :", error);
  }
};


export default function AjoutScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(false);
  const [scanned, setScanned] = useState(true);
  const [scanning, setScanning] = useState('');

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);
  const handleBarCodeScanned = ({ type, data }:{type:any, data:any}) => {
    setScanning('');
    Vibration.vibrate();
    setScanned(true);
    //alert(`ISBN ${data} scanné`);
    router.push({
      pathname: "/ajouterMan",
      params: { isbn: data },
    });

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  function Ajouter_manuellement(){
    setScanned(true);
    setScanning('');

    //console.log("Ajouter man");
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barCodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View>
        <Text style ={styles.scanning}>{scanning}</Text>
      </View>
      <View style={styles.button_container}>
        {scanned && (
          <TouchableOpacity
          onPress={() =>{
            setScanning('Scan auto en cours ...');
            setScanned(false);
          }}
          style={styles.scan_again}>
            <Ionicons name={'scan'} size={28} color={'white'} />
            <Text style={{paddingTop: 6, color:'white', fontSize: 9, textAlign: 'center'}}>Scanner</Text>
          </TouchableOpacity>
        )}
        <Link href="/ajouterMan" asChild>
        <TouchableOpacity
          onPress={Ajouter_manuellement}
          style={styles.roundButton}>
          <Ionicons name={'open-outline'} size={28} color={'white'} />
          <Text style={{paddingTop: 6, color:'white', fontSize: 9, textAlign: 'center'}}>Ajouter à la main</Text>
        </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scanning:{
    flexBasis:'auto',
    top:-150,
    textAlign:'center',
    fontSize:35,
    color:'white',
  },
  button_container:{
    flexDirection:"row",
    position:'absolute',
    bottom:70,
    marginLeft: (screenWidth/2)-80,
  },
  roundButton:{
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#254b7f',
  },
  scan_again:{
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#254b7f',
    marginRight:10
  }
});