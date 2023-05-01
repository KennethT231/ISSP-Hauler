import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#F5F5F5",
  },
  section: {
      marginBottom: 20,
      backgroundColor: "#FFFFFF",
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000000",
      shadowOpacity: 0.1,
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowRadius: 5,
      elevation: 3,
  },
  heading: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      textTransform: "uppercase",
  },
  label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
  },
  text: {
      fontSize: 14,
      marginBottom: 20,
      lineHeight: 26,
  },
  image: {
      width: "100%",
      height: 200,
      marginBottom: 20,
      borderRadius: 10,
  },
});

export default styles;

