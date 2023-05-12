import React, {useRef, useState, useEffect} from 'react'
import { Dimensions,
  StyleSheet,PermissionsAndroid, 
  View,Linking,Text,TouchableOpacity,
  Alert} from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
//import { GOOGLE_MAP_API } from '@env';
import * as Location from 'expo-location';
import { sendGpsCordinates } from '../../../network';
import { getDistance } from "geolib";
import { markDriverArrival } from '../../../network';
import { ScrollView } from 'react-native-gesture-handler';

export default function Map({ navigation,route }) {
  const { width, height } = Dimensions.get("window");
  const mapView = useRef();
  let post = route.params.targetPost;

  const completeJob = () => {
    try {
      markDriverArrival(post._id)
        Alert.alert(
            "Alert",
            "Confirm load has been picked up",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Continue", onPress: () => navigation.navigate('MyJobListNavigator', { screen: 'MyJobList' }) }
            ]
          );
    
    } catch (err) {
        console.log(err)
    }
}

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permissions, setPermissions] = useState(false);
  const [distance,setDistance] = useState(50000);
  const [coordinates, setCoordinates] = useState([
    {
      latitude: post.driverLat,
      longitude:post.driverLong,
    },
    {
      latitude: post.pickUpAddressLat,
      longitude: post.pickUpAddressLng,
    },
  ]);

  //hook for creating a maps route for the driver once they accept the job
  useEffect(() => {
    (async () => {
      //permissions for location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setPermissions(true);

      //get Location object of the driver and store in state
      //Location object contains:
      //  coords: {
      //    latitude: number,
      //    longitude: number,
      //    and other useful info
      //  },
      //  timestamp: number,
      //
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      //update the coordinates state with the current lat/long of the driver
      const { latitude, longitude } = location.coords;
      const newCoordinate = { latitude, longitude };
      let newdata = [...coordinates];
      newdata[0] = newCoordinate;
      setCoordinates(newdata);
    })();
  }, []);

  //hook for updating the driver's location every 5 seconds
  useEffect(() => {
    if (permissions) {
        (async () => {
          let location = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.BestForNavigation,
              timeInterval: 5000,
              distanceInterval: 0,
            },
            (location) => {
              setLocation(location);
              const { latitude, longitude } = location.coords;
              const newCoordinate = { latitude, longitude };
              let newdata = [...coordinates];
              newdata[0] = newCoordinate;
              setCoordinates(newdata);
              
              //send the new coordinates to the backend
              sendGpsCordinates(post._id,latitude,longitude);

              //check if the driver has arrived at the pickup location
              let distance = getDistance(
                { latitude: latitude, longitude: longitude },
                { latitude: post.pickUpAddressLat, longitude: post.pickUpAddressLng }
              );
              setDistance(distance);
            }
          );

          if (distance < 150) {
            //send a notification to the backend that the driver has arrived
            console.log("driver has arrived");
            markDriverArrival(post._id);
            Alert.alert(
              "You have arrived!",
              "Please wait for the customer to come out.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    // navigation.navigate("MyJobListNavigator", { screen: "MyJobList" });
                    Location.stopLocationUpdatesAsync(location);
                  },
                },
              ]
            );
          }
        })();
    }
  }, [permissions]);

  return (
    <ScrollView contentContainerStyle = {styles.container}>
      <View style={styles.header}>
      <Text style={styles.listTitle}>Pickup Address: {post.pickUpAddress}</Text>
      <Text style={styles.listTitle}>Dropoff Address: {post.dropOffAddress}</Text>
      <Text style={styles.listTitle}>Distance: {distance} meters</Text>
    </View>

      <TouchableOpacity style={[styles.backButton]} onPress={() => {
        navigation.navigate("MyJobListNavigator", {screen: "MyJobList"});
        Location.stopLocationUpdatesAsync(location);
      }
      }>
        <Text style={[styles.buttonTitle, styles.listTitle]}>Stop</Text>
      </TouchableOpacity>

      <MapView style={styles.map} ref={mapView}>
        {console.log("coordinates", coordinates)}
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
          strokeWidth={5}
          strokeColor="#0000ff"
          optimizeWaypoints={true}
          onReady={(result) => {
            mapView.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: width / 10,
                bottom: height / 10,
                left: width / 10,
                top: height / 10,
              },
            });
          }}
          onError={(errorMessage) => {
            console.log(`Error: ${errorMessage}`);
          }}
        />
      </MapView>
      { (distance <= 50) &&
        <TouchableOpacity
          style={[styles.button, styles.startRouteButton]}
          onPress={() => completeJob()}>
          <Text style={[styles.buttonTitle, styles.listTitle]}>Arrived on Site</Text>
                    </TouchableOpacity>
      }
    </ScrollView>
    );
};

  const styles = StyleSheet.create({
    map: {
      width: Dimensions.get("window").width - 30,
      height: 550,
      borderRadius: 20,
    },
    mapContainer: {
      paddingTop: 30,
      paddingBottom: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
    },    
    listTitle:{
    color: 'black'
    },
    button: {
      backgroundColor: '#06C167',
      marginVertical: 10,
      height: 48,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%'
    },
    backButton: {
      backgroundColor: '#FF0000',
      marginVertical: 10,
      height: 48,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%'
    },
  });
