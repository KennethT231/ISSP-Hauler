import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from './PaymentDetailCss';
import { getOneServiceProvider } from "../../../network";

const PaymentDetail = () => {
    const route = useRoute();
    const post = route.params.post;
    console.log("payment detail", post);
    const [serviceProvider, setServiceProvider] = useState({});

    useEffect(() => {
        getServiceProvider();
    }, []);

    const getServiceProvider = async () => {
        const sP = await getOneServiceProvider(post.acceptedServiceProvider);
        setServiceProvider(sP);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.heading}>Post Details</Text>
                <Text style={styles.label}>Post Heading:</Text>
                <Text style={styles.text}>{post.postHeading}</Text>
                <Text style={styles.label}>Post Description:</Text>
                <Text style={styles.text}>{post.postDescription}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>Pickup Details</Text>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.text}>{post.pickUpAddress}</Text>
                {/*<Text style={styles.label}>City:</Text>
                <Text style={styles.text}>{post.pickUpCity}</Text>*/}
                <Text style={styles.label}>Contact Person:</Text>
                <Text style={styles.text}>{post.pickUpContactPerson}</Text>
                <Text style={styles.label}>Contact Number:</Text>
                <Text style={styles.text}>{post.pickUpContactNumber}</Text>
                <Text style={styles.label}>Special Instructions:</Text>
                <Text style={styles.text}>{post.pickUpSpecialInstruction}</Text>
            </View>
            {post.service !== "Junk" && (
                <View style={styles.section}>
                    <Text style={styles.heading}>Dropoff Details</Text>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.text}>{post.dropOffAddress}</Text>
                    {/*<Text style={styles.label}>City:</Text>
                    <Text style={styles.text}>{post.dropOffCity}</Text>*/}
                    <Text style={styles.label}>Contact Person:</Text>
                    <Text style={styles.text}>{post.dropOffContactPerson}</Text>
                    <Text style={styles.label}>Contact Number:</Text>
                    <Text style={styles.text}>{post.dropOffContactNumber}</Text>
                    <Text style={styles.label}>Special Instructions:</Text>
                    <Text style={styles.text}>{post.dropOffSpecialInstruction}</Text>
                </View>
            )}
            <View style={styles.section}>
                <Text style={styles.heading}>Payment Details</Text>
                <Text style={styles.label}>Accepted Price:</Text>
                <Text style={styles.text}>${post.acceptedPrice}</Text>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.text}>{post.status}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>Service Provider Details</Text>
                <Text style={styles.label}>First Name:</Text>
                <Text style={styles.text}>{serviceProvider.firstName}</Text>
                <Text style={styles.label}>Last Name:</Text>
                <Text style={styles.text}>{serviceProvider.lastName}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.text}>{serviceProvider.email}</Text>
                <Text style={styles.label}>Contact Number:</Text>
                <Text style={styles.text}>{serviceProvider.contactNumber}</Text>
            </View>
            <View style={styles.section}>
                {post.loadImages.map((image) => (
                    <Image key={image._id} style={styles.image} source={{ uri: image.imageUrl }} />
                ))}
            </View>
        </ScrollView>
    );
};

export default PaymentDetail;