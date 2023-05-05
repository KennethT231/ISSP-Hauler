import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 10,
    },
    infoContainer: {
        flex: 1,
        minWidth: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#3D3B3B',
        flexDirection: 'row',
        marginVertical: 10,
        height: 70,
        padding: 10,
        alignItems: 'center',
    },
    infoKey: {
        fontWeight: 'bold',
        color: '#3D3B3B',
        fontSize: 14,
        marginRight: 20,
    },
    infoValue: {
        flex: 3,
        color: '#3D3B3B',
        fontSize: 14,
    },
    imageDisplay: {
        width: 300,
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3D3B3B',
        marginVertical: 10,
    },
    iconStyle: {
        backgroundColor: '#3D3B3B',
        borderRadius: 20,
        padding: 5,
        overflow: 'hidden'
    },
});

export default styles;
