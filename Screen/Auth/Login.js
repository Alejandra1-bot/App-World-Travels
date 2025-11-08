import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  useColorScheme
} from "react-native";
import BottonComponent from "../../Components/BottonComponents";
import { useState } from "react";
import { loginUser } from "../../Src/Navegation/Service/AuthService";
import { useAppContext } from "../../Screen/Configuracion/AppContext";

export default function Login({ navigation }) {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAppContext();

  const theme = useColorScheme(); // "light" | "dark"

  const colors = theme === "dark"
    ? {
        background: "#0F172A",
        card: "#1E293B",
        text: "#F1F5F9",
        subtext: "#94A3B8",
        border: "#334155",
        inputBg: "#1E293B",
      }
    : {
        background: "#E0F2FE",
        card: "#fff",
        text: "#0F172A",
        subtext: "#64748B",
        border: "#CBD5E1",
        inputBg: "#F8FAFC",
      };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginUser(Email, password);
      if (result.success) {
        const token = result.token;
        const role = result.role || 'usuario'; // default if not provided
        const userId = result.userId;
        await login(token, role, userId);
        Alert.alert("Éxito", "Inicio de sesión exitoso");
      } else {
        Alert.alert(
          "Error de Login",
          typeof result.message === "string"
            ? result.message
            : result.message?.message || JSON.stringify(result.message) || "Ocurrió un error al iniciar sesión"
        );
      }
    } catch (error) {
      console.error("Error inesperado en login:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al intentar iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Logo */}
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
          style={styles.logo}
        />

        {/* Título */}
        <Text style={[styles.titulo, { color: colors.text }]}>🏥 World Travels</Text>
        <Text style={[styles.subtitulo, { color: colors.subtext }]}>
          Accede a tu cuenta para continuar
        </Text>

        {/* Inputs */}
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
          ]}
          placeholder="📧 Correo electrónico"
          placeholderTextColor={colors.subtext}
          value={Email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
          ]}
          placeholder="🔒 Contraseña"
          placeholderTextColor={colors.subtext}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

              <BottonComponent 
          title="✅ Iniciar Sesión"  
          onPress={handleLogin} 
          disabled={loading}
          gradient // este activa el gradiente
        />

        <BottonComponent
          title="¿No tienes cuenta? Regístrate"
          onPress={() => navigation.navigate("Registro")}
          style={{ backgroundColor: "#0A2647", paddingVertical: 14, paddingHorizontal: 20, borderRadius: 25 }}
        />

      </View>
    </KeyboardAvoidingView>
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
