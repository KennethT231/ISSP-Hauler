import React, { useRef, useState, useEffect } from "react";
import {
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
  View,
  Linking,
  Alert
} from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Marker } from "react-native-maps";
// import { GOOGLE_MAP_API } from "@env";
import { getOnePost } from "../../../network";

export default function Map({ navigation, route }) {
  const { width, height } = Dimensions.get("window");
  const mapView = useRef();
  let post = route.params.post;

  const [status, setStatus] = useState(post.status);
  //   console.log(post.status);
  //   console.log(status);

  const [coordinates, setCoordinates] = useState([
    {
      latitude: post.driverLat,
      longitude: post.driverLong,
    },
    {
      latitude: post.pickUpAddressLat,
      longitude: post.pickUpAddressLng,
    },
  ]);

  // console.log("----------------------------------------")
  // console.log(coordinates)
  // const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  // const latLng = `${lat},${lng}`;
  // const label = "Custom Label";
  // const url = Platform.select({
  //   ios: `${scheme}${label}@${latLng}`,
  //   android: `${scheme}${latLng}(${label})`,
  // });
  // Linking.openURL(url);

  //   let distance = getDistance(coordinates[0], coordinates[1]);
  useEffect(() => {
    // console.log(distance);
    const fetchData = async () => {
      let data = await getOnePost(post._id);
      const newCoordinate = {
        latitude: data.driverLat,
        longitude: data.driverLong,
      };

      let newdata = [...coordinates];
      newdata[0] = newCoordinate;
      console.log("called fetch");

      setStatus(data.status);
      setCoordinates(newdata);
    };

    if (status == "Complete") {
      Alert.alert("Job Complete", "This Job is completed and Tracking no longer available", [
        { text: "OK", onPress: () => navigation.navigate('Home', { screen: 'MyPostList' }) },
      ]);
    } else {
      const id = setInterval(() => {
        fetchData(); // <-- (3) invoke in interval callback
      }, 5000);
      fetchData();// <-- (2) invoke on mount
      // } else {
      return () => {
        // console("it ended but no alerts");
        clearInterval(id);
      }
    }

  }, [status]);
  // // console.log(coordinates.length);

  // if(coordinates.length === 0){

  //     console.log("lenthg is zeroe")

  // }else{
  //     console.log("added the data")
  //     console.log(coordinates);

  // console.log(status);
  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} ref={mapView}>
        {coordinates.map((coordinate, index) => (
          <Marker
            key={`coordinate_${index}`}
            coordinate={coordinate}
            icon={require("../../../assets/map-marker.png")}
          />
        ))}
        <MapViewDirections
          apikey={"AIzaSyCMvEs9takJvuKNDt0RaIm-xfZH2uCUr-s"}
          origin={coordinates[0]}
          waypoints={coordinates}
          destination={coordinates[coordinates.length - 1]}
          strokeWidth={3}
          strokeColor="#0000ff"
          optimizeWaypoints={true}
          onReady={(result) => {
            mapView.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: width / 20,
                bottom: height / 20,
                left: width / 20,
                top: height / 20,
              },
            });
          }}
          onError={(errorMessage) => {
            console.log(`Error: ${errorMessage}`);
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width - 30,
    height: 600,
    borderRadius: 20,
  },
  mapContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
