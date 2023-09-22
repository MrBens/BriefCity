import {Pressable, StyleSheet, View, Text} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

const ToolsMenu = ({toggleCameraType, videoDuration, setVideoDuration, setShowCamera}) => {
  const durationValues = [7, 10, 15, 20, 30]

  const handleVideoDurationChange = () => {
    let currentIndex = durationValues.findIndex(elm => videoDuration === elm)
    if (currentIndex + 1 > durationValues.length - 1){
      setVideoDuration(durationValues[0])
    }else{
      setVideoDuration(durationValues[currentIndex + 1])
    }
  }

  return (
    <View style={styles.toolsMenuContainer}>
      <Pressable onPress={() => setShowCamera(false)}>
        <MaterialCommunityIcons name="window-close" size={24} color="white" />
      </Pressable>
      <Pressable>
        <Ionicons name="settings-sharp" size={24} color="white" />
      </Pressable>
      <Pressable onPress={toggleCameraType}>
        <MaterialIcons name="flip-camera-android" size={24} color="white"/>
      </Pressable>
      <Pressable onPress={handleVideoDurationChange}>
        <Ionicons name="time-outline" size={24} color="white" />
        <Text style={styles.durationTextStyle}>{videoDuration}</Text>
      </Pressable>
    </View>
  );
};

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
  durationTextStyle : {
    position : 'absolute',
    color: 'white',
    backgroundColor : 'grey',
    bottom : 0
  }
});

export default ToolsMenu;