import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        
    },
    centerText: {
        textAlign: 'center',
        marginTop: 85,
        fontSize: 40,
        fontFamily: 'sans-serif-condensed',
    },
    text: {
        height: 40,
        margin: 15,
        borderWidth: 1,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#1177FC',
        borderRadius: 10,
        display: 'flex',
        margin: 10,
        width: '90%'
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 50,
        textAlign: 'center'
    },

});