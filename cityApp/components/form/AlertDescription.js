import React, {useEffect, useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";

const AlertDescription = ({setAlertDesc, setSelectedAlertType, alertDate, setAlertDate, alertTime, setAlertTime, setShowCamera, image, video }) => {

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const alertTypes = ["Voirie", "Stationnement", "Travaux"]
  const date = useRef(new Date());

  const onChange = (event) => {
    setShow(false);
    if (mode === 'date'){
      setAlertDate(
        new Intl.DateTimeFormat("fr-FR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
          .format(event.nativeEvent.timestamp)
      )
    }else if(mode === 'time'){
      setAlertTime(
        new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit"
        })
          .format(event.nativeEvent.timestamp)
        )
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const renderDropdownIcon = () => {
    return <AntDesign name="caretdown" size={18} color="white" />
  }

  return (
    <View style={{gap : 15}}>
      <View style={{alignItems:'center', justifyContent:"center", gap:8}}>
        <Pressable style={[styles.button, {backgroundColor: "grey"}]} onPress={() => setShowCamera(true)}>
          <MaterialCommunityIcons name="camera-plus" size={24} color="white" />
          <Text style={styles.buttonText}>Ajouter une photo / video</Text>
        </Pressable>
        <Text style={styles.inputLabel}>{image ? image.split('/').pop() : video && video.split('/').pop()}</Text>
      </View>

      <Text style={styles.inputLabel}>Description :</Text>
      <TextInput multiline={true} numberOfLines={4} onChangeText={(value) => setAlertDesc(value.trim())} style={[styles.input, {textAlignVertical: 'top', maxHeight: 100}]}></TextInput>

      <View style={{flexDirection : 'row', justifyContent: 'space-between', alignItems : 'center'}}>
        <Text style={styles.inputLabel}>Type de signalement :</Text>
        <SelectDropdown
          defaultButtonText={"Type d'alerte"}
          dropdownIconPosition={'right'}
          renderDropdownIcon={renderDropdownIcon}
          buttonStyle={{borderRadius : 8, backgroundColor:'grey', alignItems:'center'}}
          buttonTextStyle={{color:'white'}}
          dropdownStyle={{backgroundColor: 'grey', borderBottomLeftRadius:8, borderBottomRightRadius:8}}
          rowTextStyle={{color:'white'}}
          data={alertTypes}
          onSelect={(selectedItem, index) => setSelectedAlertType(selectedItem)}
          buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
          rowTextForSelection={(item, index) => {return item}}
        />
      </View>

      <View style={{flexDirection : 'row', justifyContent: 'space-between', alignItems : 'center'}}>
        <Text style={styles.inputLabel}>Date du signalement :</Text>
        {Platform.OS === 'android' ?
          <Pressable style={styles.dateButton} onPress={() => showMode('date')}>
            <Text style={styles.textButton}>{alertDate.toLocaleString()}</Text>
          </Pressable>
          :
          <DateTimePicker
            testID="dateTimePicker"
            value={date.current}
            mode={'date'}
            onChange={onChange}
          />
        }

        {Platform.OS === 'android' && show && mode === 'date' &&
          <DateTimePicker
            testID="dateTimePicker"
            value={date.current}
            mode={'date'}
            onChange={onChange}
          />
        }
      </View>
      <View style={{flexDirection : 'row', justifyContent: 'space-between', alignItems : 'center'}}>
        <Text style={styles.inputLabel}>Heure du signalement :</Text>
        {Platform.OS === 'android' ?
          <Pressable style={styles.dateButton} onPress={() => showMode('time')}>
            <Text style={styles.textButton}>{alertTime.toLocaleString()}</Text>
          </Pressable>

          :

          <DateTimePicker
            testID="dateTimePicker"
            value={date.current}
            mode={'time'}
            is24Hour={true}
            onChange={onChange}
          />
        }

        {Platform.OS === 'android' && show && mode === 'time' &&
          <DateTimePicker
            testID="dateTimePicker"
            value={date.current}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        }
      </View>
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
  button : {
    borderRadius : 10,
    padding : 15,
    gap : 10,
    flexDirection : "row",
    alignItems : 'center'
  },
  buttonText: {
    color : 'white',
    fontWeight : 'bold'
  },
  dateButton: {
    padding : 10,
    borderRadius : 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'grey'
  },
  textButton : {
    color: 'white',
    fontWeight: '600'
  }
});

export default AlertDescription;