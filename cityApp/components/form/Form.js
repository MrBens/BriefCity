import {
  Modal,
  Pressable,
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import * as Location from "expo-location";
import PersonalInfos from "./PersonalInfos";
import AddressInfos from "./AddressInfos";
import AlertDescription from "./AlertDescription";
import MapView, {Marker} from "react-native-maps";
import {StatusBar} from "expo-status-bar";
import CameraModal from "../camera/CameraModal";
import axios from "axios";

const Form = ({setShowModal, geolocation, setModalStep, modalStep, isShowedByModal, markerPosition, handleMakerPosition, setMarkerPosition}) => {
  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mail, setMail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [selectedAlertType, setSelectedAlertType] = useState('')
  const [alertDesc, setAlertDesc] = useState('')
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [alertDate, setAlertDate] = useState(new Intl.DateTimeFormat('fr-FR', {timeZone: 'Europe/Paris'}).format(Date.now()))
  const [alertTime, setAlertTime] = useState(new Intl.DateTimeFormat('fr-FR', {
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
    timeZone: 'Europe/Paris',
  }).format(Date.now()))

  const handleClose = () => {
    setShowModal(false)
    setModalStep(1)
  }

  const handleNext = () => {
    modalStep < 3 ? setModalStep(modalStep + 1) : handleSubmit()
  }

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('to', "simplonville@simplon.com")
    formData.append('cc' , "benji050197@gmail.com")
    formData.append('subject', `ALERTE : ${selectedAlertType} - ${alertDate} !`)
    formData.append('html', `
        <span><h1>Alerte </h1><p>le : ${alertDate} à ${alertTime}</p></span>
        <p><b>${firstName} ${lastName} </b> à signalé un incident à l'adresse suivante : <b>${address}, ${zipCode}, ${city}</b></p>
        <h3><b>Résumé du signalement : </b></h3>
        <b>Données client : </b>
        <p>Nom : ${lastName}</p>
        <p>Prénom : ${firstName}</p>
        <p>mail : ${mail}</p>
        <p>Téléphone : ${phoneNumber}</p>

        <b>Adresse : </b>
        <p>Adresse complete : ${address}, ${zipCode}, ${city}</p>
        <p>Voie : ${address}</p>
        <p>Code postal : ${zipCode}</p>
        <p>Ville : ${city}</p>

        <b>Alerte : </b>
        <p>Type :  ${selectedAlertType}</p>
        <p>Jour du signalement : ${alertDate}</p>
        <p>Heure du signalement : ${alertTime}</p>
        <p>Description : ${alertDesc}</p>
      `)

    formData.append('media', {
      uri: image ? image : video && video,
      type: image ? 'image/jpg' : 'video/mp4',
      name: image ? 'image.jpg' : 'video.mp4'
    });

    axios.post('http://192.168.1.34:3000/send-mail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  }

  const handlePrevious = () => {
    if (modalStep > 1){
      setModalStep(modalStep - 1)
    }else {
      handleClose()
    }
  }

  useEffect(() => {
    markerPosition && handleMyLocation(true)
    isShowedByModal(false)
  }, [markerPosition])

  const handleMyLocation = async (useMarker = false) => {
    if (geolocation) {
      const {latitude, longitude} = useMarker ? markerPosition : geolocation.coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for (let item of response) {
        let address = ''

        if (item.streetNumber && item.street){
          address = item.streetNumber + ' ' + item.street
        }else if (item.streetNumber && !item.street) {
          address = item.streetNumber
        }else if(!item.streetNumber && item.street) {
          address = item.street
        }

        setAddress( address);
        setCity(item.city);
        setZipCode(item.postalCode);
      }
    }
  }

  const handleMarkerLocation = () => {
    setShowModal(false)
    isShowedByModal(true)
  }

  return (
    <Modal animationType="slide" transparent={true}>
      {Platform.OS === 'android' &&
        <StatusBar
          animated={true}
          backgroundColor="grey"
        />
      }
      <KeyboardAvoidingView
        style={{flex : 1}}
      >
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Signaler</Text>
            <Pressable onPress={handleClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>

          <View style={styles.stepper}>
            {
              modalStep === 1 ?
                <PersonalInfos
                  lastName={lastName}
                  setLastName={setLastName}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  mail={mail}
                  setMail={setMail}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                /> :

              modalStep === 2 ?
                <AddressInfos
                  address={address}
                  setAddress={setAddress}
                  city={city}
                  setCity={setCity}
                  zipCode={zipCode}
                  setZipCode={setZipCode}
                  handleMyLocation={handleMyLocation}
                  handleMarkerLocation={handleMarkerLocation}
                /> :

                modalStep === 3 &&
                <AlertDescription
                  setAlertDesc={setAlertDesc}
                  alertDate={alertDate}
                  setAlertDate={setAlertDate}
                  alertTime={alertTime}
                  setAlertTime={setAlertTime}
                  setSelectedAlertType={setSelectedAlertType}
                  setShowCamera={setShowCamera}
                  image={image}
                  video={video}
                />
            }

            <View style={styles.actionsContainer}>
              <Pressable onPress={handlePrevious} style={[styles.button, {backgroundColor: "red"}]}>
                <Text style={styles.buttonText}>{modalStep > 1 ? 'Précédent' : 'Annuler'}</Text>
              </Pressable>
              <Pressable onPress={handleNext} style={[styles.button, {backgroundColor: "green"}]}>
                <Text style={styles.buttonText}>{modalStep < 3 ? 'Suivant' : 'Valider'}</Text>
              </Pressable>
            </View>
          </View>

          <MapView style={styles.map} showsUserLocation showsTraffic onPress={(e) => handleMakerPosition(e)}>
            {markerPosition && <Marker draggable coordinate={markerPosition} onDragEnd={e => setMarkerPosition(e.nativeEvent.coordinate)}/>}
          </MapView>
        </View>

        {showCamera && <CameraModal setShowCamera={setShowCamera} image={image} setImage={setImage} video={video} setVideo={setVideo}/>}

      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    height : '100%',
    width : '100%',
    top : 0,
  },
  titleContainer: {
    backgroundColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop : Platform.OS === 'ios' ? 40 : 0
  },
  stepper : {
    justifyContent : "space-around",
    padding : 15,
    backgroundColor: '#25292e',
    minHeight : '50%'
  },
  // stepperHeadersContainer: {
  //   flexDirection : "row",
  //   justifyContent : "center",
  //   gap : 15,
  //   paddingVertical : 15
  // },
  // stepperHeader : {
  //   alignItems :"center",
  //   justifyContent : "center",
  //   borderRadius: 150,
  //   paddingVertical: 5,
  //   paddingHorizontal : 25
  // },
  // stepperHeaderText : {
  //   flexDirection : "row",
  //   alignItems : 'center',
  //   justifyContent : "center",
  //   color: 'white',
  // },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  actionsContainer : {
    flexDirection : "row",
    marginVertical : 15,
    justifyContent : "center",
    gap : 25
  },
  button : {
    borderRadius : 10,
    padding : 15,
  },
  buttonText: {
    color : 'white',
    fontWeight : 'bold'
  },
  map : {
    height : '50%',
  }
});


export default Form;