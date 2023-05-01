import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, ScrollView, Image, Platform, TouchableOpacity } from 'react-native'
import styles from './AddIrwmScreenCss';
import * as ImagePicker from 'expo-image-picker';
import SelectWeight from '../../components/SelectWeight/SelectWeight';
import { Ionicons } from '@expo/vector-icons';
import { getOnePost } from '../../../network'

export default function AddItemScreen({ navigation, route }) {

  const { operation, postId } = route.params;
  const [selectedweight, setSelectedWeight] = useState('')
  const [selectedquantity, setSelectedQuantity] = useState(1)
  const [image, setImage] = useState(null);
  const [postHeading, setPostHeading] = useState('')
  const [description, setDescription] = useState('')
  const [disable, setDisable] = useState(false)

  const onPlusPress = () => {
    setDisable(false)
    let newNum = selectedquantity + 1
    setSelectedQuantity(newNum)
  }

  const onMinusPress = () => {
    if (selectedquantity > 1) {
      let newNum = selectedquantity - 1
      setSelectedQuantity(newNum)
    }
    else {
      setDisable(true)
    }
  }

  useEffect(() => {
    (async () => {
      if (operation === "edit") {
        const post = await getOnePost(postId)
        setSelectedWeight(post.loadWeight)
        setSelectedQuantity(post.numberOfItems)
        setPostHeading(post.postHeading)
        setDescription(post.postDescription)
      }
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImageAlbum = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}> Post Heading  </Text>
        <TextInput style={styles.inputLine1}
          onChangeText={(postHeading) => { setPostHeading(postHeading) }}
          value={postHeading}
        />

        <Text style={styles.text}> Post Description </Text>
        <TextInput style={styles.inputLine1}
          multiline
          onChangeText={(description) => { setDescription(description) }}
          value={description}
        />

        <View styles={styles.select}>
          <SelectWeight
            selectedweight={selectedweight}
            setSelectedWeight={setSelectedWeight}
          />
        </View>

        <View style={styles.view}>
          <Text style={styles.text}> Number of Items  </Text>
          <TouchableOpacity activeOpacity={0.5} disabled={disable} onPress={() => onMinusPress()} style={styles.TouchableOpacityStyle}>
            <Ionicons name="remove-circle-outline" size={24} color="#0177FC" /></TouchableOpacity>
          <Text style={styles.numberDisplay}> {selectedquantity} </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => onPlusPress()} style={styles.TouchableOpacityStyle}>
            <Ionicons name="add-circle-outline" size={24} color="#0177FC" />
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.button} onPress={() => pickImageAlbum()}><Text style={styles.buttonTitle}>Upload Image</Text></TouchableOpacity>

        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={styles.imageDisplay} />}
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddJunkScreen2',
              {
                image: image,
                selectedweight: selectedweight,
                selectedquantity: selectedquantity,
                postHeading: postHeading,
                description: description,
                operation: operation,
                postId: postId
              }
            )} style={styles.button} >
            <Text style={styles.buttonTitle}>Next</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
