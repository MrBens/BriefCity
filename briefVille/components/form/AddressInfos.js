import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import { MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

const AddressInfos = ({address, setAddress, city, setCity, zipCode, setZipCode, handleMyLocation, handleMarkerLocation}) => {
  return (
    <View style={{gap : 15}}>
      <View style={{flexDirection : "row", justifyContent:'center', gap: 15}}>
        <Pressable onPress={() => handleMyLocation(false)} style={[styles.button, {backgroundColor: "grey"}]}>
          <MaterialIcons name="my-location" size={20} color="white" />
          <Text style={styles.buttonText}>Utiliser ma position</Text>
        </Pressable>
        <Pressable onPress={handleMarkerLocation} style={[styles.button, {backgroundColor: "grey"}]}>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Choisir sur la carte</Text>
        </Pressable>
      </View>

      <Text style={styles.inputLabel}>Adresse :</Text>
      <TextInput value={address} onChangeText={(value) => setAddress(value.trim())} style={styles.input}></TextInput>

      <Text style={styles.inputLabel}>Ville :</Text>
      <TextInput value={city} onChangeText={(value) => setCity(value.trim())} style={styles.input}></TextInput>

      <Text style={styles.inputLabel}>Code postal :</Text>
      <TextInput keyboardType={'numeric'} value={zipCode} onChangeText={(value) => setZipCode(value.trim().toLowerCase())} style={styles.input}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel : {
    color: 'white'
  },
  input : {
    backgroundColor: 'grey',
    borderRadius : 8,
    padding:8,
    color:'white'
  },
  button : {
    borderRadius : 10,
    padding : 15,
    gap : 10,
    flexDirection : "row",
    alignItems : 'center'
  },
  buttonText: {
    color : 'white',
    fontWeight : 'bold'
  },
});

export default AddressInfos;