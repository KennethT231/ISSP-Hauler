import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   //alignItems: 'center',
  //   marginVertical: 20
  // },

  container: {
      display: 'flex',
      minHeight: 600,
      width: '100%',
      backgroundColor: 'white',
      paddingTop: 15,
      backgroundColor: '#f0f0f0',
  },

  screenHeading: {
      fontSize: 30,
      fontWeight: '500',
      marginLeft: 20
  },

  inputLine1: {
      height: 25,
      overflow: 'hidden',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 30,
      paddingLeft: 16,
      width: '90%',
      overflow: 'hidden',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 30,
      paddingLeft: 16,
      width: '90%',
      height: 40,
      borderColor: '#3d3b3b',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: '#fff', 
  },

  inputLine2: {
      height: 100,
      width: '90%',
      borderRadius: 5,
      overflow: 'hidden',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 30,
      paddingLeft: 16,
      borderWidth: 1.0,
      borderColor: '#BFBFBF'
  },

  button: {
      backgroundColor: '#1970d4',
      alignSelf: 'center',
      marginVertical: 10,
      width: '90%',
      height: 48,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: 'center'
  },

  buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
  },

  text: {
      color: '#000000',
      marginLeft: 25,
      fontWeight: 'bold',
      marginTop: 20
  },

  containerSlider: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
  },

  pickup: {
      fontSize: 18,
      color: 'black',
      paddingLeft: 18,
      fontWeight: 'bold'
  },

  dropOff: {
      fontSize: 18,
      color: 'black',
      paddingLeft: 18,
      paddingTop: 20,
      fontWeight: 'bold' 
  }

});

export default styles;