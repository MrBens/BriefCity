import {StyleSheet, Image, Dimensions, Pressable, View, Text, Platform} from 'react-native';
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";

export default function ImageViewer({ setShowCamera, placeholderImageSource, selectedImage, setImage, onSaveAsync}) {
  const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View>
      <Image source={imageSource} style={{width : windowWidth, height : windowHeight}} />

      <View style={styles.toolsMenuContainer}>
        <Pressable onPress={() => setShowCamera(false)}>
          <MaterialCommunityIcons name="window-close" size={24} color="white" />
        </Pressable>

        <Pressable onPress={() => setImage(null)}>
          <Ionicons name="md-trash-bin" size={28} color="white" />
        </Pressable>

        <Pressable onPress={() => onSaveAsync(selectedImage)}>
          <MaterialIcons name="save-alt" size={24} color="white" />
        </Pressable>
      </View>

      {selectedImage &&
        <View style={styles.btnContainer}>
          <Pressable style={styles.useBtn} onPress={() => setShowCamera(false)}>
            <Text style={{color : 'white'}}>Utiliser cette photo</Text>
          </Pressable>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  toolsMenuContainer: {
    position : "absolute",
    display : "flex",
    justifyContent :"center",
    alignItems : "center",
    paddingVertical : 15,
    right : 5,
    top : 50,
    width: 50,
    // height: 130,
    padding: 3,
    backgroundColor : 'grey',
    borderRadius : 8,
    gap: 10
  },
  btnContainer : {
    position : "absolute",
    display : "flex",
    justifyContent :"center",
    alignItems : "center",
    paddingVertical : 15,
    bottom : 50,
    width: '100%',
  },
  useBtn : {
    backgroundColor : 'grey',
    padding : 20,
    borderRadius : 8
  }
});