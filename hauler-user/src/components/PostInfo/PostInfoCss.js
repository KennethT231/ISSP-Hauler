import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
      paddingHorizontal: 10, 
      backgroundColor: 'white',
      marginTop: -10
  },

  infoContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      borderColor: '#3d3b3b',
      height: 30,
      paddingTop: 5,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: '#fff', 
  },

  imageContainer: {
      marginVertical: 10,
  },

  infoKey: {
      color: '#A9A9A9',
      width: 170,
  },

  infoKey1: {
    color: '#A9A9A9',
    width: 170,
    marginTop: 10,
  },

  infoContainer1: {
      flexDirection: 'row',
      marginVertical: 10,
      borderColor: '#3d3b3b',
      height: 50,
      paddingTop: 5,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: '#fff', 
  },

  infoValue: {
      marginRight: 10,
      width: '65%',
      fontWeight: 'bold',
  },

  infoValue1: {
      marginRight: 10,
      marginTop: 10,
      fontWeight: 'bold',
  },

  iconStyle: {
      backgroundColor: '#0077FC',
      borderRadius: 20,
      height: 35,
      padding: 5,
      overflow: 'hidden'
  },

  buttons: {
      backgroundColor: '#0077FC',
      marginVertical: 10,
      height: 48,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%'
  },

  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
  },

});

export default styles;