import {Alert, Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Circle, Overlay} from 'react-native-maps';
import WarningButton from "./WarningButton";
import React, {useEffect, useState} from "react";
import * as Location from "expo-location";
import Form from "./form/Form";
import {StatusBar} from "expo-status-bar";

const Map = ({navigation}) => {

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [geolocation, setGeolocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [heading, setHeading] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showedByModal, isShowedByModal] = useState(false)
  const [modalStep, setModalStep] = useState(1)
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Attendez, nous récupérons votre position...'
  );

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  useEffect(() => {
    CheckIfLocationEnabled();
    getLocation();
    getHeading();
  }, []);

  const getHeading = async () => {
    await Location.watchHeadingAsync(value => setHeading(value.trueHeading))
  }

  const getLocation = async () => {
    await Location.watchPositionAsync({},value => setGeolocation(value))
  }
  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "La localisation n'est pas active",
        'Veuillez activer la localisation sur votre appareil',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    let location = await Location.getCurrentPositionAsync()
    let head = await Location.getHeadingAsync()

    if (status !== 'granted') {
      Alert.alert(
        'Permission non accordée',
        "Veuillez authoriser l'application à utiliser votre localisation",
        [{text: 'OK'}],
        {cancelable: false}
      );
    }

    setGeolocation(await Location.getCurrentPositionAsync())
    if (geolocation) {
      const {latitude, longitude} = geolocation.coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

        setDisplayCurrentAddress(address);
      }
    }

    if (head){
      setHeading(head.trueHeading)
    }
  }

  const handlePress = () => {
    setShowModal(true)
  }

  const handleMakerPosition = (e) => {
    if (showedByModal) {
      setMarkerPosition(e.nativeEvent.coordinate)
      setShowModal(true)
    }else{
      setMarkerPosition(e.nativeEvent.coordinate)
    }
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' &&
        <StatusBar
          animated={true}
          backgroundColor="white"
        />
      }
      <MapView style={styles.map} showsUserLocation showsTraffic onPress={(e) => handleMakerPosition(e)}>
        {markerPosition && <Marker draggable coordinate={markerPosition} onDragEnd={e => setMarkerPosition(e.nativeEvent.coordinate)}/>}
      </MapView>

      <View style={{position: "absolute", bottom: 25, right: 25}}>
        <WarningButton onPress={handlePress}></WarningButton>
      </View>

      {/*<View style={styles.title}>*/}
        {showModal &&
          <Form
            setShowModal={setShowModal}
            geolocation={geolocation}
            markerPosition={markerPosition}
            modalStep={modalStep}
            setModalStep={setModalStep}
            isShowedByModal={isShowedByModal}
            handleMakerPosition={handleMakerPosition}
            setMarkerPosition={setMarkerPosition}
          />
        }
      {/*</View>*/}
      {/*{showCamera &&*/}
      {/*  <CameraModal*/}
      {/*    handleCloseCam={handleCloseCam}*/}
      {/*    // setShowModal={setShowModal}*/}
      {/*    // geolocation={geolocation}*/}
      {/*    // markerPosition={markerPosition}*/}
      {/*    // modalStep={modalStep}*/}
      {/*    // setModalStep={setModalStep}*/}
      {/*    // isShowedByModal={isShowedByModal}*/}
      {/*    // handleMakerPosition={handleMakerPosition}*/}
      {/*    // setMarkerPosition={setMarkerPosition}*/}
      {/*  />*/}
      {/*}*/}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position : "relative",
    paddingTop: Platform.OS === "android" && 25 ,
    backgroundColor : Platform.OS === "android" && 'white',
  },
  map: {
    // flex : 1,
    width: '100%',
    height: '100%',
  },
  title : {
    position: "absolute",
  }
});

export default Map;