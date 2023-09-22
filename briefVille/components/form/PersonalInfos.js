import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

const PersonalInfos = ({lastName, setLastName, firstName, setFirstName, mail, setMail, phoneNumber, setPhoneNumber}) => {
  return (
    <View style={{gap : 15}}>
      <Text style={styles.inputLabel}>Nom :</Text>
      <TextInput value={lastName} onChangeText={(value) => setLastName(value.trim())} style={styles.input}></TextInput>
      <Text style={styles.inputLabel}>Prénom :</Text>
      <TextInput value={firstName} onChangeText={(value) => setFirstName(value.trim())} style={styles.input}></TextInput>
      <Text style={styles.inputLabel}>Mail :</Text>
      <TextInput value={mail} onChangeText={(value) => setMail(value.trim().toLowerCase())} style={styles.input}></TextInput>
      <Text style={styles.inputLabel}>Téléphone :</Text>
      <TextInput value={phoneNumber} keyboardType={'numeric'} onChangeText={(value) => setPhoneNumber(value.trim())} style={styles.input}></TextInput>
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
});

export default PersonalInfos;