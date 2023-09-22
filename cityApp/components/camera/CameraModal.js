import {useEffect, useRef, useState} from 'react';
import {Modal, View, StyleSheet, Dimensions, Platform} from "react-native";
import Footer from "./Footer";
import ToolsMenu from "./ToolsMenu";
// import CameraScreen from "./CameraScreen";
import {Camera, CameraType, VideoCodec} from "expo-camera";
import {GestureHandlerRootView, State, TapGestureHandler} from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
// import CameraScreen from "./CameraScreen";
import {StatusBar} from "expo-status-bar";
import ImageViewer from "./ImageViewer";
import VideoViewer from "./VideoViewer";
// import {runOnJS } from "react-native-reanimated";

const CameraModal = ({setShowCamera, image, setImage, video, setVideo}) => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [videoDuration, setVideoDuration] = useState(7);
  const [camera, setCamera] = useState(null);
  const [isRecording, setIsRecoding] = useState(false);

  const toggleCameraType = () => {
    setCameraType(current => current === CameraType.back ? CameraType.front : CameraType.back)
  };

  const doubleTapRef = useRef(null);

  const onSingleTapEvent = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("single tap 1");
    }
  };

  const onDoubleTapEvent = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      toggleCameraType()
    }
  };

  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null)
      console.log(data)
      setImage(data.uri);
    }
  }

  const takeVideo = async () => {
    if(camera){
      setIsRecoding(true)
      const data = await camera.recordAsync({maxDuration : videoDuration, codec : VideoCodec.H264})
      setVideo(data.uri);
      setIsRecoding(false)
    }
  }

  const stopRecording = () => {
    if(isRecording){
      camera.stopRecording()
      setIsRecoding(false)
    }
  }

  const onSaveAsync = async (media) => {
    if (Platform.OS !== 'web') {
      try {
        let result = await MediaLibrary.saveToLibraryAsync(media);
        if (result) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }


  return (
    <Modal animationType={'slide'}>
      <GestureHandlerRootView style={styles.container}>
        <View collapsable={false} style={styles.container}>
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={onDoubleTapEvent}
            numberOfTaps={2}>
            <Camera ref={ref => setCamera(ref)} style={{width: windowWidth, height:windowHeight}} type={cameraType}>
              <ToolsMenu toggleCameraType={toggleCameraType} videoDuration={videoDuration} setVideoDuration={setVideoDuration} setShowCamera={setShowCamera}></ToolsMenu>
              <Footer takePicture={takePicture} takeVideo={takeVideo} isRecording={isRecording} stopRecording={stopRecording} image={image} video={video}></Footer>
            </Camera>
          </TapGestureHandler>
        </View>
      </GestureHandlerRootView>

      {image && <ImageViewer setShowCamera={setShowCamera} selectedImage={image} setImage={setImage} onSaveAsync={onSaveAsync}/>}
      {video && <VideoViewer setShowCamera={setShowCamera} selectedVideo={video} setVideo={setVideo} onSaveAsync={onSaveAsync}/>}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});


export default CameraModal;