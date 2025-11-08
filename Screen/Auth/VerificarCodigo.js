
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

export default function VerificarCodigo({ navigation, route }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { email } = route.params || {};

  const theme = useColorScheme();

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

  const handleVerifyCode = () => {
    if (!code) {
      Alert.alert("Error", "Por favor ingresa el código enviado a tu correo");
      return;
    }
    if (code.length !== 6) {
      Alert.alert("Error", "El código debe tener 6 dígitos");
      return;
    }
    navigation.navigate("ResetPassword", { code, email });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
          style={styles.logo}
        />

        <Text style={[styles.titulo, { color: colors.text }]}> Verificar Código</Text>

        <Text style={[styles.subtitulo, { color: colors.subtext }]}>
          Ingresa el código de 6 dígitos enviado a tu correo electrónico
        </Text>

        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
          ]}
          placeholder="🔢 Código de verificación"
          placeholderTextColor={colors.subtext}
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={6}
          editable={!loading}
        />

        <BottonComponent
          title="✅ Verificar Código"
          onPress={handleVerifyCode}
          disabled={loading}
          gradient
        />

        <BottonComponent
          title="⬅️ Volver"
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "#0A2647", paddingVertical: 14, paddingHorizontal: 20, borderRadius: 25 }}
        />

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14,
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 15,
    textAlign: "center",
  },
});









// import {
//   TextInput,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   useColorScheme
// } from "react-native";
// import BottonComponent from "../../components/BottonComponents";
// import { useState } from "react";

// export default function VerificarCodigo({ navigation, route }) {
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { email } = route.params || {};

//   const theme = useColorScheme(); // "light" | "dark"

//   const colors = theme === "dark"
//     ? {
//         background: "#0F172A",
//         card: "#1E293B",
//         text: "#F1F5F9",
//         subtext: "#94A3B8",
//         border: "#334155",
//         inputBg: "#1E293B",
//       }
//     : {
//         background: "#E0F2FE",
//         card: "#fff",
//         text: "#0F172A",
//         subtext: "#64748B",
//         border: "#CBD5E1",
//         inputBg: "#F8FAFC",
//       };

//   const handleVerifyCode = () => {
//     if (!code) {
//       Alert.alert("Error", "Por favor ingresa el código enviado a tu correo");
//       return;
//     }
//     if (code.length !== 6) {
//       Alert.alert("Error", "El código debe tener 6 dígitos");
//       return;
//     }
//     // Navegar a ResetPassword con el código y email
//     navigation.navigate("ResetPassword", { code, email });
//   };

//   return (
//     <KeyboardAvoidingView
//       style={[styles.container, { backgroundColor: colors.background }]}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
//     >
//       <View style={[styles.card, { backgroundColor: colors.card }]}>
//         {/* Logo */}
//         <Image
//           source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
//           style={styles.logo}
//         />

//         {/* Título */}
//         <Text style={[styles.titulo, { color: colors.text }]}> Verificar Código</Text>
//         <Text style={[styles.subtitulo, { color: colors.subtext }]}>
//           Ingresa el código de 6 dígitos enviado a tu correo electrónico
//         </Text>

//         {/* Input Código */}
//         <TextInput
//           style={[
//             styles.input,
//             { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
//           ]}
//           placeholder="🔢 Código de verificación"
//           placeholderTextColor={colors.subtext}
//           value={code}
//           onChangeText={setCode}
//           keyboardType="numeric"
//           maxLength={6}
//           editable={!loading}
//         />

//         <BottonComponent
//           title="✅ Verificar Código"
//           onPress={handleVerifyCode}
//           disabled={loading}
//           gradient
//         />

//         <BottonComponent
//           title="⬅️ Volver"
//           onPress={() => navigation.goBack()}
//           style={{ backgroundColor: "#0A2647", paddingVertical: 14, paddingHorizontal: 20, borderRadius: 25 }}
//         />

//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   card: {
//     width: "100%",
//     maxWidth: 380,
//     borderRadius: 20,
//     padding: 25,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   logo: {
//     width: 90,
//     height: 90,
//     marginBottom: 15,
//   },
//   titulo: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 5,
//     textAlign: "center",
//   },
//   subtitulo: {
//     fontSize: 14,
//     marginBottom: 25,
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     padding: 14,
//     borderWidth: 1,
//     borderRadius: 12,
//     marginBottom: 15,
//     fontSize: 15,
//     textAlign: "center",
//   },
// });