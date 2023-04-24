import React from 'react';
import { StyleSheet, View } from 'react-native';
<<<<<<< HEAD
// import RNPickerSelect from 'react-native-picker-select-updated';
=======
import RNPickerSelect from 'react-native-picker-select-updated';
>>>>>>> 5266d9a8a2b09a255a55de1443d026beeb76c257
// Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
// 1. You might have mismatching versions of React and the renderer (such as React DOM)
// 2. You might be breaking the Rules of Hooks
// 3. You might have more than one copy of React in the same app
// See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

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
                        paddingVertical: 8,
                        color: 'black',
                    },
                }}
                onValueChange={(value) => { setLocation(value); searchLocation({ location: value }) }}
                placeholder={{ label: "Search by Location", value: null }}
                items={[
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

