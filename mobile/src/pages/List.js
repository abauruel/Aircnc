import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";

import {
  SafeAreaView,
  View,
  AsyncStorage,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from "react-native";
import logo from "../assets/logo.png";

import SportList from "../components/SpotList";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techsArray = storageTechs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://localhost:3333", {
        query: { user_id }
      });
      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);
  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <ScrollView>
        {techs.map(tech => (
          <SportList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
