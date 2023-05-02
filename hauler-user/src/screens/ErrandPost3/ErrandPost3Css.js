import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#f0f0f0',
  },

  text: {
    color: '#000000',
    fontSize: '20%',
    marginLeft: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },

  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
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
    marginTop:30,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 5
  },

});

export default styles;