// Importamos los módulos y componentes de React Native necesarios para la pantalla
import {
  TextInput, // Campo de entrada de texto
  Text, // Componente para mostrar texto
  View, // Contenedor para agrupar elementos
  StyleSheet, // Permite definir estilos en React Native
  Image, // Para mostrar imágenes
  Alert, // Muestra cuadros de diálogo nativos (alertas)
  KeyboardAvoidingView, // Evita que el teclado cubra los campos al escribir
  Platform, // Permite identificar el sistema operativo (iOS o Android)
  useColorScheme // Detecta si el tema del sistema es claro u oscuro
} from "react-native";

// Importamos el componente de botón personalizado
import BottonComponent from "../../Components/BottonComponents";

// Importamos los hooks useState y useEffect desde React
import { useState, useEffect } from "react";

// Importamos la función que realiza el restablecimiento de contraseña desde el servicio de autenticación
import { resetPassword } from "../../Src/Navegation/Service/AuthService";

// Importamos hooks de navegación de React Navigation
import { useRoute, useNavigation } from "@react-navigation/native";

// Definimos el componente principal "ResetPassword"
export default function ResetPassword({ navigation }) {

  // Estado que almacena la nueva contraseña escrita por el usuario
  const [newPassword, setNewPassword] = useState("");

  // Estado que almacena la confirmación de la contraseña
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estado que indica si hay una operación de carga en proceso
  const [loading, setLoading] = useState(false);

  // Estado que guarda el código de restablecimiento recibido
  const [code, setCode] = useState("");

  // Hook para acceder a los parámetros de la ruta actual
  const route = useRoute();

  // Hook de navegación para moverse entre pantallas
  const nav = useNavigation();

  // Hook que detecta si el sistema está en modo claro u oscuro
  const theme = useColorScheme(); // Retorna "light" o "dark"

  // useEffect se ejecuta al montar la pantalla o cuando cambian los parámetros de la ruta
  useEffect(() => {
    // Extraemos el código que viene como parámetro en la navegación
    const { code: urlCode } = route.params || {};
    if (urlCode) {
      // Si existe, lo guardamos en el estado
      setCode(urlCode);
    } else {
      // Si no hay código, mostramos un error y regresamos a la pantalla anterior
      Alert.alert("Error", "Código de restablecimiento no válido");
      nav.goBack();
    }
  }, [route.params, nav]);

  // Definición de colores dinámicos dependiendo del tema del sistema
  const colors = theme === "dark"
    ? {
        background: "#0F172A", // Fondo oscuro general
        card: "#1E293B", // Fondo de la tarjeta
        text: "#F1F5F9", // Texto claro
        subtext: "#94A3B8", // Texto secundario gris
        border: "#334155", // Borde de inputs
        inputBg: "#1E293B", // Fondo de los campos
      }
    : {
        background: "#E0F2FE", // Fondo claro general
        card: "#fff", // Fondo blanco para tarjeta
        text: "#0F172A", // Texto oscuro
        subtext: "#64748B", // Texto secundario
        border: "#CBD5E1", // Borde gris claro
        inputBg: "#F8FAFC", // Fondo de input
      };

  // Función principal que maneja el proceso de restablecer la contraseña
  const handleResetPassword = async () => {

    // Validamos que ambos campos estén completos
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return; // Detenemos la ejecución
    }

    // Validamos que ambas contraseñas coincidan
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    // Validamos longitud mínima de la contraseña
    if (newPassword.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }

    // Indicamos que comenzó la operación
    setLoading(true);

    try {
      // Llamamos al servicio para restablecer la contraseña enviando el código y la nueva contraseña
      const result = await resetPassword(code, newPassword);

      // Si la operación fue exitosa
      if (result.success) {
        Alert.alert("Éxito", "Contraseña restablecida correctamente", [
          { text: "OK", onPress: () => nav.navigate("Login") } // Redirige al login
        ]);
      } else {
        // Si ocurre un error en la respuesta del servidor
        Alert.alert(
          "Error",
          typeof result.message === "string"
            ? result.message
            : result.message?.message || JSON.stringify(result.message) || "Ocurrió un error al restablecer la contraseña"
        );
      }
    } catch (error) {
      // Captura de errores inesperados (problemas de red u otros)
      console.error("Error inesperado en restablecimiento:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al restablecer la contraseña");
    } finally {
      // Finaliza el proceso y desactiva el estado de carga
      setLoading(false);
    }
  };

  // Retornamos la estructura visual (UI) del componente
  return (
    <KeyboardAvoidingView
      // Contenedor que ajusta su posición al aparecer el teclado
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajuste diferente según plataforma
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0} // Desplazamiento del teclado en iOS
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>

        {/* Logo de la pantalla */}
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }} // URL del ícono
          style={styles.logo} // Estilo del logo
        />

        {/* Título principal */}
        <Text style={[styles.titulo, { color: colors.text }]}>🔐 Restablecer Contraseña</Text>

        {/* Subtítulo de instrucciones */}
        <Text style={[styles.subtitulo, { color: colors.subtext }]}>
          Ingresa tu nueva contraseña
        </Text>

        {/* Campo para ingresar la nueva contraseña */}
        <TextInput
          style={[
            styles.input, // Estilo base
            { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text }, // Colores dinámicos
          ]}
          placeholder="🔒 Nueva Contraseña" // Texto indicativo
          placeholderTextColor={colors.subtext} // Color del placeholder
          value={newPassword} // Valor actual del campo
          onChangeText={setNewPassword} // Actualiza el estado al escribir
          secureTextEntry // Oculta los caracteres por seguridad
          editable={!loading} // Desactiva el campo si está cargando
        />

        {/* Campo para confirmar la contraseña */}
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
          ]}
          placeholder="🔒 Confirmar Contraseña"
          placeholderTextColor={colors.subtext}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
        />

        {/* Botón para enviar el formulario */}
        <BottonComponent
          title="✅ Restablecer Contraseña" // Texto del botón
          onPress={handleResetPassword} // Acción al presionar
          disabled={loading} // Deshabilitado mientras carga
          gradient // Activa el fondo con gradiente
        />

        {/* Botón para regresar al login */}
        <BottonComponent
          title="⬅️ Volver al Login" // Texto del botón
          onPress={() => nav.navigate("Login")} // Redirige a pantalla de Login
          style={{
            backgroundColor: "#0A2647", // Fondo azul oscuro
            paddingVertical: 14, // Espaciado vertical
            paddingHorizontal: 20, // Espaciado horizontal
            borderRadius: 25, // Bordes redondeados
          }}
        />

      </View>
    </KeyboardAvoidingView>
  );
}

// Definición de estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    justifyContent: "center", // Centra verticalmente
    alignItems: "center", // Centra horizontalmente
    padding: 20, // Espaciado interno
  },
  card: {
    width: "100%", // Ocupa todo el ancho disponible
    maxWidth: 380, // Ancho máximo
    borderRadius: 20, // Bordes redondeados
    padding: 25, // Espaciado interno
    alignItems: "center", // Centra el contenido
    shadowColor: "#000", // Color de la sombra
    shadowOpacity: 0.1, // Opacidad de sombra
    shadowOffset: { width: 0, height: 6 }, // Dirección de la sombra
    shadowRadius: 10, // Difuminado
    elevation: 6, // Sombra visible en Android
  },
  logo: {
    width: 90, // Ancho de la imagen
    height: 90, // Alto de la imagen
    marginBottom: 15, // Espacio inferior
  },
  titulo: {
    fontSize: 26, // Tamaño del texto
    fontWeight: "bold", // Negrita
    marginBottom: 5, // Espacio inferior
    textAlign: "center", // Centrado
  },
  subtitulo: {
    fontSize: 14, // Tamaño de letra
    marginBottom: 25, // Espaciado inferior
    textAlign: "center", // Centrado
  },
  input: {
    width: "100%", // Ancho completo
    padding: 14, // Relleno interno
    borderWidth: 1, // Grosor del borde
    borderRadius: 12, // Bordes redondeados
    marginBottom: 15, // Espaciado entre inputs
    fontSize: 15, // Tamaño del texto
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
// import { useState, useEffect } from "react";
// import { resetPassword } from "../../Src/Services/AuthService";
// import { useRoute, useNavigation } from "@react-navigation/native";

// export default function ResetPassword({ navigation }) {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [code, setCode] = useState("");

//   const route = useRoute();
//   const nav = useNavigation();
//   const theme = useColorScheme(); // "light" | "dark"

//   useEffect(() => {
//     // Extraer el código de los parámetros de la ruta
//     const { code: urlCode } = route.params || {};
//     if (urlCode) {
//       setCode(urlCode);
//     } else {
//       Alert.alert("Error", "Código de restablecimiento no válido");
//       nav.goBack();
//     }
//   }, [route.params, nav]);

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

//   const handleResetPassword = async () => {
//     if (!newPassword || !confirmPassword) {
//       Alert.alert("Error", "Por favor completa todos los campos");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       Alert.alert("Error", "Las contraseñas no coinciden");
//       return;
//     }
//     if (newPassword.length < 8) {
//       Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
//       return;
//     }
//     setLoading(true);
//     try {
//       const result = await resetPassword(code, newPassword);
//       if (result.success) {
//         Alert.alert("Éxito", "Contraseña restablecida correctamente", [
//           { text: "OK", onPress: () => nav.navigate("Login") }
//         ]);
//       } else {
//         Alert.alert(
//           "Error",
//           typeof result.message === "string"
//             ? result.message
//             : result.message?.message || JSON.stringify(result.message) || "Ocurrió un error al restablecer la contraseña"
//         );
//       }
//     } catch (error) {
//       console.error("Error inesperado en restablecimiento:", error);
//       Alert.alert("Error", "Ocurrió un error inesperado al restablecer la contraseña");
//     } finally {
//       setLoading(false);
//     }
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
//         <Text style={[styles.titulo, { color: colors.text }]}>🔐 Restablecer Contraseña</Text>
//         <Text style={[styles.subtitulo, { color: colors.subtext }]}>
//           Ingresa tu nueva contraseña
//         </Text>

//         {/* Input Nueva Contraseña */}
//         <TextInput
//           style={[
//             styles.input,
//             { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
//           ]}
//           placeholder="🔒 Nueva Contraseña"
//           placeholderTextColor={colors.subtext}
//           value={newPassword}
//           onChangeText={setNewPassword}
//           secureTextEntry
//           editable={!loading}
//         />

//         {/* Input Confirmar Contraseña */}
//         <TextInput
//           style={[
//             styles.input,
//             { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
//           ]}
//           placeholder="🔒 Confirmar Contraseña"
//           placeholderTextColor={colors.subtext}
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry
//           editable={!loading}
//         />

//         <BottonComponent
//           title="✅ Restablecer Contraseña"
//           onPress={handleResetPassword}
//           disabled={loading}
//           gradient
//         />

//         <BottonComponent
//           title="⬅️ Volver al Login"
//           onPress={() => nav.navigate("Login")}
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
//   },
// });