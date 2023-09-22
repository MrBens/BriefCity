import { View, Pressable, StyleSheet } from 'react-native';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {State, TapGestureHandler} from "react-native-gesture-handler";
import {useRef, useState} from "react";
// import {Camera} from "expo-camera";

const CircleButton = ({takePicture, takeVideo, isRecording, stopRecording}) => {

  const doubleTapRef = useRef(null);

  const onSingleTapEvent = async (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (isRecording) {
        stopRecording()
      }else {
        takePicture()
      }
    }
  };

  const onDoubleTapEvent = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      takeVideo()
    }
  };

  return (
    <View style={styles.circleButtonContainer}>
      <TapGestureHandler
        onHandlerStateChange={onSingleTapEvent}
        waitFor={doubleTapRef}>
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={onDoubleTapEvent}
          numberOfTaps={2}
        >
          <Pressable style={[styles.circleButton, {backgroundColor: isRecording ? 'red' : '#fff'}]}>
            {/*<MaterialIcons name="add" size={38} color="#25292e" />*/}
          </Pressable>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
  },
});
export default CircleButton;