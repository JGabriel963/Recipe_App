import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Logo } from "../../components/logo";
import { useState, useEffect } from "react";

import api from "../../services/app";
import FoodList from "../../components/foodlist";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get("/foods");
      setFoods(response.data);
    }

    fetchApi();
  }, []);

  function handleSearch() {
    alert("Você digitou: " + inputValue);
  }

  return (
    <SafeAreaView style={styles.continer}>
      <Logo />

      <Text style={styles.title}>Encontre a receita</Text>
      <Text style={styles.title}>que combine com você</Text>

      <View style={styles.form}>
        <TextInput
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder="Digite o nome da comida..."
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color="#4cbe6c" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: "#f3f9ff",
    paddingTop: 20,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0e0e0e",
  },
  form: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ececec",
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "90%",
    maxWidth: "90%",
    height: 54,
  },
});
