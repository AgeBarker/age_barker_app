import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
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
import useImagePicker from './hooks/ImagePickerHook';
import SecondaryButton from './components/SecondaryButton';

function App(): React.JSX.Element {
  const [result, setResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState<boolean>(false);

  const [photoSelected, setPhotoSelected] = React.useState<boolean>(false);
  const {
    imageInfo, 
    image, 
    pickImage, 
    reset,
    takePhoto
  } = useImagePicker();

  useEffect(() => {
    if (imageInfo) {
      setPhotoSelected(true);
      console.log('Image selected', imageInfo.uri);
    } else {
      setPhotoSelected(false);
      setResult(null);
      setError(null);
      setLoading(false);
      setDone(false);
    }
  }, [imageInfo]);

  const analyze = async () => {
    if (!imageInfo) {
      setError('Please select an image');
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append('image', {
      name: imageInfo.fileName,
      type: imageInfo.type,
      uri: imageInfo.uri,
    });

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const json = await response.json();
      console.log('Response:', json);
      setResult(json.result);
      setLoading(false);
      setDone(true);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        style={styles.background}>
        <View 
          style={styles.mainContainer}>
          <Header />
          {!photoSelected && 
            <ControlPanel 
              onTakePhoto={takePhoto}
              onChoosePhoto={pickImage}
            />
          }
          {photoSelected && image && <Image style={{width: 200, height: 200}} source={{uri: image}} />}
          {result && done && <Text>{result}</Text>}
          {loading && <Text>Loading...</Text>}
          {error && <Text>{error}</Text>}
          {photoSelected && <PrimaryButton title='Analyze' onPress={analyze} />}
          {photoSelected && <SecondaryButton title='Reset' onPress={reset} />}
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
