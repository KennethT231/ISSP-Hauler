import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select-updated';

export default function SearchByService({ service, setService, searchService }) {

    return (
        <View style={styles.search}>
            {/* <RNPickerSelect
                value={service}
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
                        paddingVertical: 8,
                        color: 'black'
                    },
                }}
                onValueChange={(value) => { setService(value); searchService({ service: value }) }}
                placeholder={{ label: "Search by Service", value: null }}
                items={[
                    { label: 'Junk Removal', value: 'Junk' },
                    { label: 'Moving', value: 'Moving' },
                    { label: 'Errand', value: 'Errand' },
                ]}
            /> */}
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

