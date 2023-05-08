import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Review Post Screen - Screen that displays the post information
export default function PostInfo({ image, selectedweight, selectedquantity, postHeading, description, pickUpAddress, pickContactPerson, pickUpPhoneNumber, pickUpSpecialInstructions, sliderValue, dropOffAddress, dropOffContactNumber, dropOffContactPerson, dropOffSpecialInstruction, distance, junkSummaryRoute, errandSummaryRoute }) {
    const [loading, setLoading] = useState(false);

    const destinationInfo = () => {
        if (!!dropOffAddress) {
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
                                <Text style={styles.infoValue}>{dropOffContactNumber}  </Text>
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
            )
        }
        return;
    }
    return (
        <View style={styles.container}>
            {/* image */}
            <View>
                {/* conditionally rendering image depends on route */}
                {(image && (junkSummaryRoute?.name === "AddJunkSummary" || errandSummaryRoute?.name === "ErrandSummary")) && (
                    <Image
                        source={{ uri: image?.uri || image }}
                        style={styles.imageDisplay}
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                    />
                )}

                {/* detail page image rendering */}
                {(image && (junkSummaryRoute?.name !== "AddJunkSummary" && errandSummaryRoute?.name !== "ErrandSummary")) && (
                    <Image
                        source={{ uri: image }}
                        style={styles.imageDisplay}
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                    />
                )}

                {/* show loading indicator if the image is being loaded */}
                {loading && (
                    <View style={{ position: 'absolute', top: '40%', left: '40%' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}

            </View>
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
                <Text style={styles.infoKey}>Number of items</Text>
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

                <View style={styles.infoContainer}>
                    <Text style={styles.infoKey}>Pick Up Contact Number</Text>
                    <Text style={styles.infoValue}>{pickUpPhoneNumber}  </Text>
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
                <Text style={styles.infoValue}>${sliderValue}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 10,
    },
    infoContainer: {
        flex: 1,
        minWidth: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#3D3B3B',
        flexDirection: 'row',
        marginVertical: 10,
        height: 70,
        padding: 10,
        alignItems: 'center',
    },
    infoKey: {
        fontWeight: 'bold',
        color: '#3D3B3B',
        fontSize: 14,
        marginRight: 20,
    },
    infoValue: {
        flex: 3,
        color: '#3D3B3B',
        fontSize: 14,
    },
    imageDisplay: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3D3B3B',
        marginVertical: 10,
    },
    iconStyle: {
        backgroundColor: '#3D3B3B',
        borderRadius: 20,
        padding: 5,
        overflow: 'hidden'
    },
});



