import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },

    profileContainer: {
        flex: 1,
        width: '100%',
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    avatar: {
        alignItems: 'center'
    },

    user: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 35,
        color: '#5C5C5C',
        marginBottom: 10
    },

    infoContainer: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        height: 70,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: '1%',
        width: 350,
        paddingLeft: 16,
        marginLeft: 30,
        marginTop: 30,
    },

    infoIcon: {
        marginHorizontal: 20,
        marginVertical: 20,
    },

    userInfo: {
        color: 'black',
        fontSize: 20,
        marginVertical: 20,
    },

    modalContainer: {
        margin: 20
    },

    buttons: {
        width: '48%',
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    editButton: {
        backgroundColor: '#0177FC',
        width: 200,
        marginBottom: 30
    },

    logOutButton: {
        backgroundColor: '#585858',
        width: 200,
        marginBottom: 30
    },

    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },

    input: {
        borderColor: 'black',
        borderWidth: 1,
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: '1%',
        marginHorizontal: '2%',
        paddingLeft: 16,
    },

    paymentHistoryButton: {
        backgroundColor: 'navy',
        width: '90%',
        height: 50,
        width: 200,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default styles;