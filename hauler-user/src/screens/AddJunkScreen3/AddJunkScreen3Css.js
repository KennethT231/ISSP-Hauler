import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
      display: 'flex',
      minHeight: 600,
      width: '100%',
      backgroundColor: '#f0f0f0',
      marginTop: 15,
  },

  inputLine1: {
      overflow: 'hidden',
      marginTop: 10,
      marginLeft: 20,
      marginRight: 30,
      paddingLeft: 16,
      width: '90%',
      borderBottomWidth: 1.0,
      height: 40,
      borderColor: '#3d3b3b',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: '#fff', 
  },

  text: {
      color: '#BFBFBF',
      marginLeft: 25,
      fontWeight: 'bold',
      marginTop: 20
  },
  
  button: {
      backgroundColor: '#1970d4',
      alignSelf: 'center',
      marginVertical: 10,
      width: '90%',
      height: 48,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: '#0177FC',
      marginTop: 30,
      shadowOpacity: 0.8,
      shadowOffset: {
        height: 2,
        width: 2,
      },
      elevation: 5
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

});

export default styles;