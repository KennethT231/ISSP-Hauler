import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';

export default function ImageList({ loadImages }) {
    return (
        <View style={styles.imageContainer}>
            <FlatList
                data={loadImages}
                keyExtractor={(result) => result._id}
                renderItem={({ item }) => {
                    return (
                        item &&
                        <Image style={styles.image} source={{ uri: item.imageUrl }} />
                    )
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        width: '90%',
        flexWrap: 'wrap'
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        margin: 10,
        borderRadius: 10
    },
})

