import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select-updated-updated';

export default function SelectWeight({ selectedweight, setSelectedWeight }) {

    return (
        <View style={styles.search}>
            <RNPickerSelect
                value={selectedweight}
                useNativeAndroidPickerStyle={true}
                style={{
                    inputIOS: {
                        fontSize: 14,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        color: 'black'
                    },
                    inputAndroid: {
                        fontSize: 14,
                        paddingHorizontal: 10,
                        paddingVertical: 16,
                        color: 'black'
                    },
                }}
                onValueChange={(value) => setSelectedWeight(value)}
                placeholder={{ label: "Select Weight", value: null }}
                items={[
                    { label: 'Light 0-20Kgs', value: 'Light 0-20Kgs' },
                    { label: 'Medium 20-50Kgs', value: 'Medium 20-50Kgs' },
                    { label: 'Heavy 50Kgs & above', value: 'Heavy 50Kgs & above' },
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
        marginVertical: 5,
        alignSelf: 'center',
        marginTop: 20
    }
})

