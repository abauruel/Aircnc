import React, { useState } from "react";
import api from "../services/api";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Alert,
  Dimensions
} from "react-native";
import Datapicker from "react-native-datepicker";

export default function Book({ navigation }) {
  const id = navigation.getParam("id");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("user");
    await api.post(
      `/spots/${id}/booking`,
      {
        date
      },
      {
        headers: { user_id }
      }
    );

    Alert.alert("Solicitaçao de reserva enviada.");
    navigation.navigate("List");
  }
  function handleCancel() {
    navigation.navigate("List");
  }
  return (
    <SafeAreaView>
      <Text style={styles.label}>Data de interesse</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Qual data quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      /> */}
      <Datapicker
        style={{
          width: 300,
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
        placeholder="Qual data quer reservar?"
        mode="date"
        format="DD-MM-YYYY"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        date={date}
        onDateChange={date => setDate(date)}
        customStyles={{
          dateInput: {
            marginLeft: 10
          }
        }}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCancel}
        style={[styles.button, styles.cancelButton]}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginTop: 30,
    marginLeft: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 10
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },
  container: {
    margin: 30
  }
});
