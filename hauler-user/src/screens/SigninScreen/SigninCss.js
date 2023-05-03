import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: -20,
  },

  logo: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 100,
  },

  input: {
    height: 40,
    width: '80%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#8f8f8f',
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontFamily: 'Arial',
    fontSize: 16,
  },  
  
  email: {
    color: '#BFBFBF',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 16,
  },

  button: {
    backgroundColor: '#1970d4',
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0177FC',
    marginTop: 40,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 5,
  },

  buttonTitle: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
  },

  option: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },

  optionText: {
    fontSize: 16,
    color: '#BFBFBF',
    fontFamily: 'Arial',
  },

  optionLink: {
    color: '#BB4430',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Arial',
  },

  text1: {
    color: '#1f1919',
    marginLeft: 35,
    fontFamily: 'Arial',
    fontSize: 16,
  },

  text2: {
    color: '#1f1919',
    marginLeft: 35,
    marginTop: 20,
    fontFamily: 'Arial',
    fontSize: 16,
  },

  display: {
    paddingTop: 120,
  }

});

export default styles;
