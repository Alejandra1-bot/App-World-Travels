import { TextInput, Text, View, StyleSheet } from "react-native";
import BottonComponent from "../../Components/BottonComponents";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🌍 World Travels</Text>
      <Text style={styles.subtitulo}>
        Tu compañero de confianza para planear y disfrutar tus viajes ✈️
      </Text>
     <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="✉️ Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="🔒 Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          editable={!loading}
        />

        <BottonComponent title="Iniciar Sesión" />

        <BottonComponent
          title="¿No tienes una cuenta? Regístrate"
          onPress={() => navigation.navigate("Registro")}
          style={{ backgroundColor: "#0A2647" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF6FF", // Fondo claro tipo cielo
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#003366", // Azul profundo
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 15,
    color: "#555",
    marginBottom: 22,
    textAlign: "center",
    fontStyle: "italic",
  },
  form: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#cfd9e6",
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#F9FBFF",
    fontSize: 14,
  },
  linkContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  link: {
    fontSize: 14,
    color: "#444",
  },
  linkStrong: {
    fontWeight: "bold",
    color: "#0A74DA",
  },
});
