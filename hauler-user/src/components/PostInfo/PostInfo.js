import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './PostInfoCss';
import { Feather } from '@expo/vector-icons';

export default function PostInfo({ image, selectedweight, selectedquantity, postHeading, description, pickUpAddress, pickContactPerson, pickUpPhoneNumber, pickUpSpecialInstructions, sliderValue, dropOffAddress, dropOffContactNumber, dropOffContactPerson, dropOffSpecialInstruction, distance }) {

    const destinationInfo = () => {
       if(!!dropOffAddress){
        return ( 
            <View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoKey}>Drop Off Address</Text>
                    <Text style={styles.infoValue}>
                        {dropOffAddress}
                    </Text>
                </View>
                <Text>
                    <View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoKey}>Drop Off Contact Name</Text>
                            <Text style={styles.infoValue}>{dropOffContactPerson}</Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.infoKey}>Drop Off Contact Number</Text>
                            <Text style={styles.infoValue1}>{dropOffContactNumber}  </Text>
                            <Text style={styles.iconStyle}><Feather name='phone' size={24} color='white' /></Text>
                        </View>
                    </View>

                </Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoKey}>Drop Off Instructions</Text>
                    <Text style={styles.infoValue}>{dropOffSpecialInstruction}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoKey}>Distance</Text>
                    <Text style={styles.infoValue}>{distance} km </Text>
                </View>
            </View>
        )}
        return;
    }
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Post Heading</Text>
                <Text style={styles.infoValue}>{postHeading}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Post Description</Text>
                <Text style={styles.infoValue}>{description}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Total Weight</Text>
                <Text style={styles.infoValue}>{selectedweight}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Number of items </Text>
                <Text style={styles.infoValue}>{selectedquantity}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Pick Up Address</Text>
                <Text style={styles.infoValue}>
                    {pickUpAddress}
                </Text>
            </View>
            <View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoKey}>Pick Up Contact Name</Text>
                    <Text style={styles.infoValue}>{pickContactPerson}</Text>
                </View>

                <View style={styles.infoContainer1}>
                    <Text style={styles.infoKey1}>Pick Up Contact Number</Text>
                    <Text style={styles.infoValue1}>{pickUpPhoneNumber}  </Text>
                    <Text style={styles.iconStyle}><Feather name='phone' size={24} color='white' /></Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Pick Up Instructions</Text>
                <Text style={styles.infoValue}>{pickUpSpecialInstructions}</Text>
            </View>
            {destinationInfo()}
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Price</Text>
                <Text style={styles.infoValue}>{sliderValue}</Text>
            </View>

        </View>
    )
}
