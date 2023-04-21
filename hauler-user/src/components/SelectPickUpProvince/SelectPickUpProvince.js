import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select-updated';

export default function SelectPickUpProvince({ province, setProvince }) {

    return (
        <View style={styles.search}>
            <RNPickerSelect
                value={province}
                useNativeAndroidPickerStyle={false}
                style={{
                    inputAndroid: {
                        fontSize: 14,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        color: 'black'
                    },
                }}
                onValueChange={(value) => setProvince(value)}
                placeholder={{ label: "Select Province", value: null }}
                items={[
                    { label: 'Alberta', value: 'Surrey' },
                    { label: 'British Columbia', value: 'British Columbia' },
                    { label: 'Ontario', value: 'Ontario' },
                    { label: 'Quebec', value: 'Quebec' },
                    { label: 'Saskatchewan', value: 'Saskatchewan' },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        width: '90%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 5,
        borderColor: '#BFBFBF',
        marginLeft: 20
    }
})

