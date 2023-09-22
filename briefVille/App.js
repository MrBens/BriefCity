import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./components/Home";
import Map from "./components/Map";
import * as Location from 'expo-location';
import {Camera} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import {useEffect} from "react";

const Stack = createStackNavigator();

export default function App() {

  const [locationPermission, requestLocationPermission] = Location.useBackgroundPermissions();
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [microPermission, requestMicroPermission] = Camera.useMicrophonePermissions();
  const [galleryPermission, requestGalleryPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    !locationPermission && requestLocationPermission();
    !cameraPermission && requestCameraPermission();
    !galleryPermission && requestGalleryPermission();
    !microPermission && requestMicroPermission();
  })

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}