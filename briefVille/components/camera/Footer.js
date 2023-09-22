import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import CircleButton from "./CircleButton";

const Footer = ({takePicture,takeVideo, isRecording, stopRecording, image, video}) => {
  return (
    <View style={styles.footerContainer}>
      <CircleButton takePicture={takePicture} takeVideo={takeVideo} isRecording={isRecording} stopRecording={stopRecording}></CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position : "absolute",
    display : "flex",
    justifyContent :"center",
    alignItems : "center",
    bottom : 20,
    width: '100%',
    height: 130,
    padding: 3,
  }
});


export default Footer;