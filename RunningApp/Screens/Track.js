import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";
import { styles } from "../StyleSheet.js";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import "expo-dev-client";

export default function Track() {
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([{ latitude: 0, longitude: 0 }]);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pace, setPace] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const trackRoute = () => {
    setIsTracking(!isTracking);
  };

  const startTracking = () => {
    setIsTracking(true);
    console.log("Now tracking");
    setDuration(0);
    setPace(0);
    setDistance(0);
    setLocations([]);
    setStartTime(Date.now());
    setEndTime(0);
  };

  const endTracking = () => {
    setIsTracking(false);
    console.log("Not tracking!");
    setEndTime(Date.now());
    Alert.alert("Route finished!");
  };

  // Timer was done using this tutorial: https://www.youtube.com/watch?v=xgFgZBijW7M
  // Timer for setting duration
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setDuration((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  // Timer for setting location
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        getLocation();
      }, 5000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  useEffect(() => {
    console.log(locations);

    setDistance(calculateTotalDistance());
  }, [locations]);

  // Get current location
  useEffect(() => {
    getLocation();
  }, []);

  // Update locations when current location changes
  useEffect(() => {
    if (isTracking) {
      setLocations((prevLocations) => [
        ...prevLocations,
        {
          latitude: location ? location.coords.latitude : 0,
          longitude: location ? location.coords.longitude : 0,
        },
      ]);

      setPace(duration / 60 / (distance / 1000));
    }
  }, [location]);

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
      setLocation(location);

      //return location;
    })();
  };

  const formatTimestampHours = (timestamp) => {
    if (!timestamp) {
      return "";
    }
    const date = new Date(timestamp);
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0")
    );
  };

  const formatTimestampDay = (timestamp) => {
    if (!timestamp) {
      return "";
    }
    const date = new Date(timestamp);
    return (
      date.getDate().toString().padStart(2, "0") +
      "." +
      date.getMonth().toString().padStart(2, "0") +
      "." +
      date.getFullYear()
    );
  };

  const calculateDistance = (c1, c2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const R = 6371e3; // Radius of Earth in meters
    const lat1 = toRadians(c1.latitude);
    const lat2 = toRadians(c2.latitude);
    const deltaLat = toRadians(c2.latitude - c1.latitude);
    const deltaLon = toRadians(c2.longitude - c1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const calculateTotalDistance = () => {
    let totalDistance = 0;
    for (let i = 0; i < locations.length - 1; i++) {
      totalDistance += calculateDistance(locations[i], locations[i + 1]);
    }
    return totalDistance; // Total distance in meters
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Track" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <MapView
          style={{ width: "100%", height: "50%" }}
          initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          region={{
            latitude: location ? location.coords.latitude : 0,
            longitude: location ? location.coords.longitude : 0,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
          <Marker
            coordinate={{
              latitude: location ? location.coords.latitude : 0,
              longitude: location ? location.coords.longitude : 0,
            }}
            title="Current Location"
          >
            <Icon name="circle-slice-8" size={24} color={"#120091"} />
          </Marker>

          <Polyline
            coordinates={locations}
            strokeColor="#0000AF"
            strokeWidth={1}
          />
        </MapView>

        <View style={styles.cardFlexBox}>
          <View style={styles.cardFlexBoxRow}>
            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="clock" size={32} color="#000" />
                <Text variant="titleMedium">{duration} Sec</Text>
              </Card.Content>
            </Card>

            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="map-marker-distance" size={32} color="#000" />
                <Text variant="titleMedium">
                  {Math.round((distance / 1000) * 100) / 100} km
                </Text>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.cardFlexBoxRow}>
            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="speedometer" size={32} color="#000" />
                <Text variant="titleMedium">
                  {Math.round(pace * 100) / 100} min/km
                </Text>
              </Card.Content>
            </Card>

            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="calendar" size={32} color="#000" />
                <Text variant="titleMedium">
                  {formatTimestampDay(startTime)}
                </Text>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.cardFlexBoxRow}>
            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="calendar-arrow-right" size={32} color="#000" />
                <Text variant="titleMedium">
                  {formatTimestampHours(startTime)}
                </Text>
              </Card.Content>
            </Card>

            <Card mode="elevated" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Icon name="calendar-arrow-left" size={32} color="#000" />
                <Text variant="titleMedium">
                  {formatTimestampHours(endTime)}
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>
        {/*
        <Text variant="titleLarge">Duration: {duration} sec </Text>
        <Text variant="titleLarge">
          Distance: {Math.round(distance * 100) / 100} m{" "}
        </Text>
        <Text variant="titleLarge">
          StartTime: {formatTimestampHours(startTime)}
        </Text>
        <Text variant="titleLarge">
          EndTime: {formatTimestampHours(endTime)}
        </Text>
        <Text variant="titleLarge">
          Today is: {formatTimestampDay(startTime)}
        </Text>
        <Text variant="titleLarge">
          Pace: {Math.round(pace * 100) / 100} min/km
        </Text>
*/}
        <View style={{alignItems:"center"}}>
          {!isTracking ? (
            <Button
              style={styles.button}
              mode="contained"
              icon="shoe-sneaker"
              onPress={() => startTracking()}
            >
              Start tracking
            </Button>
          ) : (
            <Button
              style={styles.button}
              mode="contained"
              icon="stop-circle"
              onPress={() => endTracking()}
            >
              End tracking
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}
