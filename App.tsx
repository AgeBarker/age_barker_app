import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Dimensions,
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


function App(): React.JSX.Element {

  const [photoSelected, setPhotoSelected] = React.useState<boolean | null>(false);

  return (
    <SafeAreaView>
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        style={styles.background}>
        <View 
          style={styles.mainContainer}>
          <Header />
          {!photoSelected && <ControlPanel 
            onTakePhoto={() => {
              console.log('Take photo')
              setPhotoSelected(true)
            }}
            onChoosePhoto={() => console.log('Choose photo')}/>
          }
          {photoSelected && <PrimaryButton title='Analyze' onPress={() => console.log("Analyzing...")}/>}
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
