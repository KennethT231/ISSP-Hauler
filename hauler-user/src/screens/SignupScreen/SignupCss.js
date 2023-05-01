import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fcfafa', 
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000', 
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000000', 
  },

  input: {
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
    shadowColor: '#0177FC',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },

  selectBtn: {
    color: '#f0eded'
  },

  buttonTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  datePicker: {
    height: 40,
    borderColor: '#C0C0C0',
    backgroundColor: '#d4d4d4',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20
  }

});

export default styles;
