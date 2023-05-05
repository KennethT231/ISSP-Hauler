import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

const PaymentDetail = () => {
    const route = useRoute();
    const post = route.params.post;
    console.log("payment detail", post);

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
                <Text style={styles.label}>City:</Text>
                <Text style={styles.text}>{post.pickUpCity}</Text>
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
                    <Text style={styles.label}>City:</Text>
                    <Text style={styles.text}>{post.dropOffCity}</Text>
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
                {post.loadImages.map((image) => (
                    <Image key={image._id} style={styles.image} source={{ uri: image.imageUrl }} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    section: {
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        elevation: 3,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textTransform: "uppercase",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 20,
        lineHeight: 26,
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
});

export default PaymentDetail;