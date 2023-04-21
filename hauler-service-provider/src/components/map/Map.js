import React, {useRef, useState,useEffect} from 'react'
import { Dimensions, ActivityIndicator,
  StyleSheet,PermissionsAndroid, 
  View,Linking,Text,TouchableOpacity,
  Alert} from 'react-native'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
// import { GOOGLE_MAP_API } from '@env';
import Geolocation from 'react-native-geolocation-service';
import { sendGpsCordinates } from '../../../network';
// import { getDistance, getPreciseDistance } from "geo-lib";
import { markDriverArrival } from '../../../network';

export default function Map({ navigation,route }) {
  const { width, height } = Dimensions.get("window");
  const mapView = useRef();
  // let post = route.params.targetPost;
  
  const [userPos, setUserPos] = useState({ latitude: null, longitude: null });

  const [distance,setDistance] = useState(50000);

  // const [coordinates, setCoordinates] = useState([
  //   {
  //     latitude: post.driverLat,
  //     longitude:post.driverLong,
  //   },
  //   {
  //     latitude: post.pickUpAddressLat,
  //     longitude: post.pickUpAddressLng,
  //   },
  // ]);

  // const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  // const latLng = `${lat},${lng}`;
  // const label = "Custom Label";
  // const url = Platform.select({
  //   ios: `${scheme}${label}@${latLng}`,
  //   android: `${scheme}${latLng}(${label})`,
  // });
  // Linking.openURL(url);

  // useEffect(() => {
  //   const fetchCurrentCoords = async () => {
  //     const options = {
  //       enableHighAccuracy: true,
  //       timeout: 5000,
  //       maximumAge: 0,
  //     };

  //     function success(pos) {
  //       const { latitude, longitude } = pos.coords;

  //       const newCoordinate = {
  //         latitude,
  //         longitude,
  //       };

  //       let newdata = [...coordinates];
  //       newdata[0] = newCoordinate;

  //       setCoordinates(newdata);

  //       // console.log("Your current position is:");
  //       // console.log(`Latitude : ${latitude}`);
  //       // console.log(`Longitude: ${longitude}`);
  //     }

  //     function error(err) {
  //       console.warn(`ERROR(${err.code}): ${err.message}`);
  //     }

  //     await Geolocation.getCurrentPosition(success, error, options);
  //   };

  //   fetchCurrentCoords();

  //   async function getlocation() {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //       );

  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // console.log("You can use the ACCESS_FINE_LOCATION");

  //         Geolocation.watchPosition(
  //           (position) => {
  //             const { latitude, longitude } = position.coords;

  //             const newCoordinate = {
  //               latitude,
  //               longitude,
  //             };
  //             sendGpsCordinates(post._id, latitude, longitude);
  //             let newdata = [...coordinates];
  //             newdata[0] = newCoordinate;
              
  //             setCoordinates(newdata);



  //           },
  //           (error) => console.log(error),
  //           {
  //             enableHighAccuracy: true,
  //             timeout: 20000,
  //             maximumAge: 1000,
  //             distanceFilter: 10,
  //           }
  //         );
  //       } else {
  //         // console.log("ACCESS_FINE_LOCATION permission denied");
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   getlocation();
  // }, []);

  // useEffect(()=>{
  //   const curdistance = getDistance(coordinates[0], coordinates[1]);
  //   console.log("current distance" + curdistance)
  //   setDistance(curdistance);
  //   console.log(distance)
  // })


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

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} ref={mapView}>
        {/* {coordinates.map((coordinate, index) => (
          <MapView.Marker
            key={`coordinate_${index}`}
            coordinate={coordinate}
            // icon={require("../../../assets/map-marker.png")}
            icon={require("./assets/map-marker.png")}
          />
        ))} */}
        {/* <MapViewDirections
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
        /> */}
      </MapView>
      { (distance <= 50) &&
        <TouchableOpacity
          style={[styles.button, styles.startRouteButton]}
          onPress={() => completeJob()}>
          <Text style={[styles.buttonTitle, styles.listTitle]}>Arrived on Site</Text>
                    </TouchableOpacity>
      }
    </View>
  );
}

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
});
