import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import { addUserResponse, getOnePost, getResponseByServiseProviderId, updatePostVisibility } from '../../../network';
import OfferInfo from '../../components/OfferInfo/OfferInfo'

export default function OfferDetails({ navigation, route }) {
    const { serviceProviderId, postId } = route.params;

    const [response, setResponse] = useState('')
    const [offer, setOffer] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [reset, setReset] = useState(true)
    const [post, setPost] = useState('')
    const [actionPrice, setActionPrice] = useState('')

    const onSendOffer = async () => {
        await addUserResponse(
            'Negotiating',
            postId,
            serviceProviderId,
            'Negotiating',
            false,
            'Offer',
            offer,
            true)
        setReset(!reset);
        navigation.navigate('Confirmation', { confirm: 'Offer' })
        console.log("Offer sent")
    }
    const onDecline = () => {
        setModalVisible(true)
    }

    const onDeclineConfirmed = async () => {
        await addUserResponse(
            'Negotiating',
            postId,
            serviceProviderId,
            'Declined',
            true,
            'Declined',
            actionPrice,
            true);
            setReset(!reset);
        setModalVisible(!modalVisible)
        navigation.navigate('Confirmation', { confirm: 'decline' })
    }
    const onAccept = async () => {
        await addUserResponse(
            'Awaiting Payment',
            postId,
            serviceProviderId,
            'Accepted',
            true,
            'Accepted',
            actionPrice,
            true
            );
            setReset(!reset);
        await updatePostVisibility(postId, actionPrice, serviceProviderId);
        navigation.navigate('PostDetails', { postId: postId,  })
    }

    useEffect(() => {
        (async () => {
            const newResponse = await getResponseByServiseProviderId(serviceProviderId, postId )
            setResponse(newResponse[0]);
            setActionPrice(newResponse[0].serviceProviderResponseSchema.length > 0 && newResponse[0].serviceProviderResponseSchema[newResponse[0].serviceProviderResponseSchema.length - 1].serviceProviderActionPrice)
            const newPost = await getOnePost(postId)
            setPost(newPost)
        })()
    }, [reset])

    return (
        <>
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
                <View style={styles.modalContainer}>
                    <Text style={styles.message}>Are you sure you want to decline? Doing so will end comminication on this post</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.buttons, styles.closeButton]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={[styles.buttonTitle, styles.closeButtonTitle]}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttons, styles.declineButton]}
                            onPress={() => onDeclineConfirmed()}>
                            <Text style={styles.buttonTitle}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <OfferInfo
                response={response}
                setOffer={setOffer}
                onSendOffer={onSendOffer}
                offer={offer}
                onDecline={onDecline}
                onAccept={onAccept}
            />
        </>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 250
    },
    message:{
        marginVertical: 20,
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    buttons: {
        margin: 10,
        width: '50%',
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    declineButton: {
        backgroundColor: '#DE0303',
    },
    closeButton: {
        backgroundColor: '#E0E0E0',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    closeButtonTitle:{
        color: 'black'
    }
})
