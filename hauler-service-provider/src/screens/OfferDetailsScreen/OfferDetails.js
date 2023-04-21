import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { addServiceProviserResponse, getOnePost, getResponseByServiseProviderId } from '../../../network';
import OfferInfo from '../../components/offerInfo/OfferInfo';

export default function OfferDetails({ navigation, route }) {

    const { uid, postId } = route.params;
    const [reset, setReset] = useState(true)
    const [response, setResponse] = useState('')
    const [actionPrice, setActionPrice] = useState('')
    const [post, setPost] = useState('')

    const [offer, setOffer] = useState('')

    const onSendOffer = async() => {
        await addServiceProviserResponse(
            'Negotiating',
            postId,
            uid,
            'Negotiating',
            true,
            'Offer',
            offer,
            false)
        setReset(!reset);
        navigation.navigate('OfferConfirmation', { confirm: 'offer' })
    }

    useEffect(() => {
        (async () => {
            const newResponse = await getResponseByServiseProviderId(uid, postId)
            setResponse(newResponse[0]);

            setActionPrice(newResponse[0] && newResponse[0].userResponseSchema.length > 0 && newResponse[0].userResponseSchema[newResponse[0].userResponseSchema.length - 1].userResponsePrice)
            const newPost = await getOnePost(postId)
            setPost(newPost)
        })()
    }, [reset])

    return (
        <OfferInfo
        response={response}
            setOffer={setOffer}
            onSendOffer={onSendOffer}
            offer={offer}
            onDecline= ""
            onAccept=""
        />
    )
}



