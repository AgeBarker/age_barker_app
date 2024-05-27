import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from './assets/colors';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import PrimaryButton from './components/PrimaryButton';

import  useImagePicker  from './hooks/ImagePickerHook';
import SecondaryButton from './components/SecondaryButton';


function App(): React.JSX.Element {

  const [photoSelected, setPhotoSelected] = React.useState<boolean | null>(false);
  const {
    imageInfo, 
    image, 
    pickImage, 
    convertBase64ToImage, 
    reset,
    takePhoto
  } = useImagePicker();

  useEffect(() => {
    if (imageInfo) {
      setPhotoSelected(true)
      console.log('Image selected', imageInfo.uri);
    }
    else {
      setPhotoSelected(false)
    }
  });

  return (
    <SafeAreaView>
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        style={styles.background}>
        <View 
          style={styles.mainContainer}>
          <Header />
          {!photoSelected && <ControlPanel 
            onTakePhoto={takePhoto}
            onChoosePhoto={pickImage}/>
          }
          {(photoSelected && image) && <Image style={{width: 200, height: 200}} source={{uri: image}}/>}
          {photoSelected && <PrimaryButton title='Analyze' onPress={() => console.log("Analyzing...")}/>}
          {photoSelected && <SecondaryButton title='Reset' onPress={reset}/>}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.bg,
  },
  mainContainer: {
    flex: 1,
    minHeight: Dimensions.get('window').height - StatusBar.currentHeight!,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
