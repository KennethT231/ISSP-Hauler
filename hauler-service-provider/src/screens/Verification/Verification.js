import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import firebase from '../../api/firebase';
import { set } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [backImage, setBackImage] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  let camera = null;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  async function uploadImage(uri) {
    console.log('uploading images')
    try {
        if (!frontImage || !backImage) {
            return null; // if no image is selected, return null
        }
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
            reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
          });
          const ref = firebase.storage().ref().child(`license-front/${licenseInfo}${uri.substring(uri.lastIndexOf('/') + 1)}`);
          const snapshot = await ref.put(blob);
        return snapshot;
    } catch (e) {
        console.log(e.message);
    }
  };

  const SubmitLicenseImages = async () => {
    console.log('submitting license images')
    try {
      const response = await uploadImage(frontImage.uri); // upload image first and get the response
      if (response === null) {
          Alert.alert('Please select an image');
          return;
      }
      const image = await response.ref.getDownloadURL(); // then get the image url from the response
      setFrontImage(image);
    } catch (e) {
      console.log(e.message);
    }

    try {
      const response = await uploadImage(backImage.uri); // upload image first and get the response
      if (response === null) {
          Alert.alert('Please select an image');
          return;
      }
      const image = await response.ref.getDownloadURL(); // then get the image url from the response
      setBackImage(image);
      setUploaded(true);
    } catch (e) {
      console.log(e.message);
    }
  }

  const takePicture = async (side) => {
    console.log('taking picture')
    console.log(side)
    if (!camera) return;
    let photo = await camera.takePictureAsync({
        onPictureSaved: (data) => {
          if (side === 'front') {
            setFrontImage(data);
          } else {
            setBackImage(data);
          }
          setPreviewVisible(true);
        },
        base64: false,
    });
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const alphaNumericData = data.split('$').filter((item) => item !== '');
    console.log(alphaNumericData);
    setLicenseInfo(alphaNumericData[1]);
  };
    

  async function handleButtonPress(side) {
    await takePicture(side);
  }
  
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {uploaded ? (
        <View>
          <Text>License images uploaded</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp', {licenseInfo: licenseInfo, frontImage: frontImage, backImage: backImage})}>
              <Text style={styles.button}>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        previewVisible ? 
          (backImage === null? 
            <ImageBackground source={{ uri: frontImage && frontImage.uri }} resizeMode='cover' style={styles.absoluteFillObject}>
            <TouchableOpacity onPress={() => {setPreviewVisible(false); setScanned(false); setFrontImage(null)}}>
              <Text style={styles.button}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setPreviewVisible(false); setScanned(false); uploadImage()}}>
              <Text style={styles.button}>Take next photo</Text>
            </TouchableOpacity>
            </ImageBackground>
            : 
            <ImageBackground source={{ uri: backImage && backImage.uri }} resizeMode='cover' style={styles.absoluteFillObject}>
              <TouchableOpacity onPress={() => {setPreviewVisible(false); setScanned(false); setBackImage(null)}}>
                <Text style={styles.button}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={SubmitLicenseImages}>
                <Text style={styles.button}>Submit Photos</Text>
              </TouchableOpacity>
            </ImageBackground>
          ):(
            <Camera
             key={scanned ? 1 : 2}
              type={CameraType.back}
              style={StyleSheet.absoluteFillObject}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              ref={(ref) => {
                  camera = ref;
              }}
            >
            {frontImage === null ?
            (
              <TouchableOpacity
                onPress={() => handleButtonPress('front')}
              ><Text style={styles.button}>Capture front of license</Text></TouchableOpacity>            
            ) : (
              !scanned ? <Text style={styles.text}>Scan the back of your license</Text> :   
              <TouchableOpacity
                onPress={() => handleButtonPress('back')}
              ><Text style={styles.button}>Capture back of license</Text></TouchableOpacity>
            )
          }
          </Camera>
          )
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
      backgroundColor: 'blue',
      color: 'white',
      fontSize: 20,
      padding: 10,
      margin: 10,
      borderRadius: 100,
      textAlign: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'black',
        padding: 20,
    },
    absoluteFillObject: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right:0,
    }
});
