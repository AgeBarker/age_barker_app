import { useState } from 'react';
import {Asset, ImagePickerResponse, launchImageLibrary, launchCamera, ImageLibraryOptions} from 'react-native-image-picker';

const useImagePicker = () => {
    const [imageInfo, setImageInfo] = useState<Asset | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const configureOptions: ImageLibraryOptions = {
        mediaType: 'photo',
        includeBase64: true,
    }

    const convertBase64ToImage = (base64: string) => {
        return `data:image/jpeg;base64,${base64}`;
    }

    const reset = () => {
        setImageInfo(null);
        setImage(null);
    }

    const pickImage = async () => {
        launchImageLibrary(configureOptions, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                let imageInfo = response.assets?.[0] || null;
                setImageInfo(imageInfo);
                let image = convertBase64ToImage(imageInfo?.base64 || '');
                setImage(image);
            }
        });
    };

    const takePhoto = () => {
        launchCamera(configureOptions, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                let imageInfo = response.assets?.[0] || null;
                setImageInfo(imageInfo);
                let image = convertBase64ToImage(imageInfo?.base64 || '');
                setImage(image);
            }
        });
    }


    return { imageInfo, image, pickImage, reset, takePhoto};
}

export default useImagePicker;