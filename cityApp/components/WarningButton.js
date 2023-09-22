import { View, Pressable, StyleSheet } from 'react-native';
import {AntDesign} from "@expo/vector-icons";

const WarningButton = ({onPress }) => {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <AntDesign name="warning" size={30} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 64,
    height: 64,
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#Ce8211',
  },
});
export default WarningButton;