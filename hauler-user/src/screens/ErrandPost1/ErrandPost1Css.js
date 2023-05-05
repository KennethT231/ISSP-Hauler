import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    minHeight: 600,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },

  inputLine1: {
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

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageDisplay: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },

  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  imageColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
  },

  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  },

  text: {
    color: '#000000',
    marginLeft: 25,
    fontWeight: 'bold',
    marginTop: 20
  },

  TouchableOpacityStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 10
  },

  view: {
    flexDirection: 'row',
    marginTop: 25,
    height: 60,
    width: '90%',
    borderColor: '#3d3b3b',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 30,
    paddingLeft: 16,
  },

  numberDisplay: {
    color: 'black',
    fontSize: 20,
    paddingTop: 15,
    marginLeft: 10
  },

  footerContainer: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    position: 'absolute',
    bottom: 0
  },

});

export default styles;