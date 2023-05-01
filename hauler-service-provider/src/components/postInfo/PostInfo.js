import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import ImageList from '../imageList/ImageList';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Map from '../map/Map';


export default function PostInfo({ posts, contact }) {
    const [modalVisible, setModalVisible] = useState(false)
  

    const onMapsPress = () => {
        setModalVisible(true)
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                transparent={false}
                opacity={0.5}
                visible={modalVisible}
                backdropOpacity={0.5}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ScrollView style={styles.modalContainer}>

                    <Text>
                        {posts &&
                    <Map
                        posts={posts}
                    />
                        }
                    </Text>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.buttonTitle}>Close</Text>
                    </TouchableOpacity>

                </ScrollView>
            </Modal>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Post Heading</Text>
                <Text style={styles.infoValue}>{posts.postHeading}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Post Description</Text>
                <Text style={styles.infoValue}>{posts.postDescription}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Total Weight</Text>
                <Text style={styles.infoValue}>{posts.loadWeight}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Number of items </Text>
                <Text style={styles.infoValue}>{posts.numberOfItems}</Text>
            </View>
            {posts.status !== 'Available' && posts.status !== 'Negotiating' && <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Pick Up Address</Text>
                <Text style={styles.infoValue}>
                    {posts.pickUpAddress}
                </Text>
            </View>}
            <Text>
                {contact &&
                    <View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoKey}>Pick Up Contact Name</Text>
                            <Text style={styles.infoValue}>{posts.pickUpContactPerson}</Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.infoKey}>Pick Up Contact Number</Text>
                            <Text style={styles.infoValue1}>{posts.pickUpContactNumber}  </Text>
                            <Text style={styles.iconStyle}><Feather name='phone' size={24} color='white' /></Text>
                        </View>
                    </View>
                }
            </Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoKey}>Pick Up Instructions</Text>
                <Text style={styles.infoValue}>{posts.pickUpSpecialInstruction}</Text>
            </View>
            {posts.dropOffAddress &&
                <View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoKey}>Drop Off Address</Text>
                        <Text style={styles.infoValue}>
                            {posts.dropOffAddress}
                        </Text>
                    </View>
                    <Text>
                        {contact && (posts.status !== 'Available' && posts.status !== 'Negotiating') &&
                            <View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.infoKey}>Drop Off Contact Name</Text>
                                    <Text style={styles.infoValue}>{posts.dropOffContactPerson}</Text>
                                </View>

                                <View style={styles.infoContainer}>
                                    <Text style={styles.infoKey}>Drop Off Contact Number</Text>
                                    <Text style={styles.infoValue1}>{posts.dropOffContactNumber}  </Text>
                                    <Text style={styles.iconStyle}><Feather name='phone' size={24} color='white' /></Text>
                                </View>
                            </View>
                        }
                    </Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoKey}>Drop Off Instructions</Text>
                        <Text style={styles.infoValue}>{posts.dropOffSpecialInstruction}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoKey}>Distance </Text>
                        <Text style={styles.infoValue1}>{posts.distance} km </Text>
                        <TouchableOpacity onPress={() => onMapsPress()}><Text style={styles.iconStyle}><MaterialCommunityIcons name='map-marker-multiple-outline' size={24} color='white' /></Text></TouchableOpacity>
                    </View>
                </View>
             }
            <View style={styles.imageContainer}>
                <Text style={styles.infoKey}>Images</Text>
                <Text>
                    {posts &&
                        <ImageList
                            loadImages={posts.loadImages}
                        />
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '95%',
    },

    infoContainer: {
        flexDirection: 'row',
        marginVertical: 10
    },

    imageContainer: {
        marginVertical: 10
    },

    infoKey: {
        color: '#A9A9A9',
        width: 140,
    },

    infoValue: {
        marginRight: 10,
        width: '65%',
        fontWeight: 'bold',
    },

    infoValue1: {
        marginRight: 10,
        fontWeight: 'bold',
        paddingTop: 8
    },

    iconStyle: {
        backgroundColor: '#0077FC',
        borderRadius: 20,
        padding: 5,
        overflow: 'hidden'
    },

    modalContainer:{
        width: '100%',
        marginHorizontal: 16
    },

    buttons:{
        backgroundColor: '#0077FC',
        marginVertical: 10,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        
    },

    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    
})


