import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },

  header: {
    marginBottom: 30,
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1970d4',
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
    backgroundColor: '#1970d4',
    borderRadius: 10,
    display: 'flex',
    margin: 10,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#0177FC',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 5,
  },

  btnText: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    textAlign: 'center'
  },

});