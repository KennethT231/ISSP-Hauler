import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select-updated';

export default function SearchByLocation({ location, setLocation, searchLocation }) {

    return (
        <View style={styles.search}>
            <RNPickerSelect
                value={location}
                useNativeAndroidPickerStyle={true}
                style={{
                    placeholder: {
                        color: 'black'
                    },
                    inputIOS: {
                        fontSize: 14,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        color: 'black'
                    },
                    inputAndroid: {
                        fontSize: 14,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        color: 'black',
                    },
                }}
                onValueChange={(value) => { setLocation(value); searchLocation({ location: value }) }}
                placeholder={{ label: "Search by Location", value: null }}
                items={[
                    { label: 'Vancouver', value: 'Vancouver'},
                    { label: 'Surrey', value: 'Surrey' },
                    { label: 'Langely', value: 'Langley' },
                    { label: 'Richmond', value: 'Richmond' },
                    { label: 'Burnaby', value: 'Burnaby' }
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        marginVertical: 5
    }
})

