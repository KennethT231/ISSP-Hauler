import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';

class LicenseInformation {
    province;
    city;
    address;
    firstName;
    lastName;
    middleName;
    licenseNumber;
    dateIssued;
    expiryDate;
    dateOfBirth;
    sex;
    height;
    weight;
    hairColor;
    eyeColor;
    restrictions;
    conditions;
    class;
}

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  let camera = null;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // const alphaNumericData = data
    // const dataArray = alphaNumericData.split('$').filter((item) => item !== '');
    // console.log(dataArray);

    // const licenseInformation = new LicenseInformation();
    // licenseInformation.firstName = dataArray[2];
    // licenseInformation.lastName = dataArray[1];
    // licenseInformation.middleName = dataArray[3];
    //licenseInformation.licenseNumber = dataArray[12].substring(-1, 15);

    //setLicenseInfo(dataArray);

    const takePicture = async () => {
        let photo = await camera.takePictureAsync({
            onPictureSaved: (data) => {
                console.log(data.uri);
            },
            base64: false,
        });
        setCapturedImage(data);
        setPreviewVisible(true);
    };

    takePicture();

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {previewVisible ? 
        (
          <ImageBackground source={{ uri: capturedImage && capturedImage.uri }} style={{ flex: 1 }}>
            <Text onPress={() => setPreviewVisible(false)}>
              Cancel
            </Text>
          </ImageBackground>
        ):(
          <Camera
            type={CameraType.back}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            ref={(ref) => {
                camera = ref;
            }}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'black',
    },
});
