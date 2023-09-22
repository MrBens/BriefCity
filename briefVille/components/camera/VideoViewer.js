import React, {useRef, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from "react-native";
import {Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {ResizeMode, Video} from "expo-av";

const VideoViewer = ({setShowCamera, selectedVideo, setVideo, onSaveAsync}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [videoMuted, setVideoMuted] = useState(false);

  return (
    <View style={{width : windowWidth, height : windowHeight}}>
      <Video
        ref={video}
        style={{width : windowWidth, height : windowHeight}}
        source={{
          uri: selectedVideo,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        isMuted={videoMuted}
        shouldPlay={true}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Pressable
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>

      <View style={styles.toolsMenuContainer}>
        <Pressable onPress={() => setVideo(null)}>
          <MaterialCommunityIcons name="window-close" size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => setVideo(null)}>
          <Ionicons name="md-trash-bin" size={28} color="white" />
        </Pressable>
        <Pressable onPress={() => setVideoMuted(!videoMuted)}>
          {videoMuted ? <Foundation name="volume-strike" size={24} color="white" /> : <Foundation name="volume" size={24} color="white" />}
        </Pressable>
        <Pressable onPress={() => onSaveAsync(selectedVideo)}>
          <MaterialIcons name="save-alt" size={24} color="white" />
        </Pressable>
      </View>

      {video &&
        <View style={styles.btnContainer}>
          <Pressable style={styles.useBtn} onPress={() => setShowCamera(false)}>
            <Text style={{color : 'white'}}>Utiliser cette video</Text>
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
export default VideoViewer;