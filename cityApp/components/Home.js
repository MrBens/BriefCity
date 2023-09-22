import {StyleSheet, Image, View, Text, Pressable} from "react-native";
import {Feather} from "@expo/vector-icons";
// import * as Location from "expo-location";

const logo = require('../assets/images/logo.png')

const Home = ({navigation}) => {

  const handlePress = () => {
    navigation.navigate('Map')
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image}/>
        <Text style={styles.title}>Bienvenue a Simplonville</Text>
      </View>

      <Pressable style={styles.button} onPress={handlePress}>
        <Feather name="map" size={24} color="white" />
        <Text style={styles.buttonText}>Map</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems : "center",
    backgroundColor: '#3d3c3c',
    gap : 20
  },
  imageContainer: {
    alignItems : "center",
    gap: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color : 'white'
  },
  image : {
    width: 150,
    height: 150,
    aspectRatio : 1
  },
  button: {
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems : "center",
    gap : 5,
    borderRadius : 8,
    padding : 15,
    backgroundColor : '#ce1136'
  },
  buttonText : {
    color : 'white'
  }
})

export default Home;