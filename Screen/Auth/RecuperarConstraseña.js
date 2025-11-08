// Importamos los componentes necesarios desde React Native
import {
  TextInput, // Campo de texto editable
  Text, // Componente para mostrar texto
  View, // Contenedor visual
  StyleSheet, // Permite crear estilos CSS en React Native
  Image, // Componente para mostrar imágenes
  Alert, // Muestra alertas nativas del sistema
  KeyboardAvoidingView, // Evita que el teclado oculte los campos de texto
  Platform, // Permite detectar el sistema operativo (iOS o Android)
  useColorScheme // Hook que detecta si el dispositivo está en modo oscuro o claro
} from "react-native";

// Importamos un componente personalizado para los botones
import BottonComponent from "../../Components/BottonComponents";

// Importamos el hook useState de React para manejar estados
import { useState } from "react";

// Importamos la función que gestiona la solicitud de recuperación de contraseña
import { requestPasswordReset } from "../../Src/Navegation/Service/AuthService";

// Definimos el componente principal RecuperarContrasena
export default function RecuperarContrasena({ navigation }) {

  // Declaramos una variable de estado para almacenar el correo del usuario
  const [email, setEmail] = useState("");

  // Declaramos una variable de estado para manejar el estado de carga (loading)
  const [loading, setLoading] = useState(false);

  // Detecta si el dispositivo está en modo oscuro o claro
  const theme = useColorScheme(); // Devuelve "light" o "dark"

  // Definimos los colores dependiendo del tema del sistema
  const colors = theme === "dark"
    ? {
        background: "#0F172A", // Fondo principal oscuro
        card: "#1E293B", // Fondo de la tarjeta
        text: "#F1F5F9", // Texto principal claro
        subtext: "#94A3B8", // Texto secundario gris
        border: "#334155", // Color del borde de los inputs
        inputBg: "#1E293B", // Fondo del input
      }
    : {
        background: "#E0F2FE", // Fondo principal claro
        card: "#fff", // Fondo blanco para tarjetas
        text: "#0F172A", // Texto principal oscuro
        subtext: "#64748B", // Texto secundario
        border: "#CBD5E1", // Color del borde de los inputs
        inputBg: "#F8FAFC", // Fondo del input
      };

  // Función que maneja la recuperación de contraseña
  const handleResetPassword = async () => {

    // Verificamos que el usuario haya ingresado un correo electrónico
    if (!email) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico"); // Muestra alerta si el campo está vacío
      return; // Finaliza la función
    }

    // Activamos el estado de carga
    setLoading(true);

    try {
      // Llamamos a la función del servicio que solicita el reinicio de contraseña
      const result = await requestPasswordReset(email);

      // Si la solicitud fue exitosa
      if (result.success) {
        Alert.alert("Éxito", "Se ha enviado un código de recuperación a tu correo electrónico"); // Muestra confirmación
        navigation.navigate("VerificarCodigo", { email }); // Navega a la pantalla de verificación
      } else {
        // Si hay un error, mostramos el mensaje recibido
        Alert.alert(
          "Error",
          typeof result.message === "string"
            ? result.message
            : result.message?.message || JSON.stringify(result.message) || "Ocurrió un error al enviar la solicitud"
        );
      }
    } catch (error) {
      // Si ocurre un error inesperado en el proceso
      console.error("Error inesperado en recuperación:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al intentar recuperar la contraseña");
    } finally {
      // Desactivamos el estado de carga al finalizar
      setLoading(false);
    }
  };

  // Retornamos la interfaz de usuario del componente
  return (
    <KeyboardAvoidingView
      // Contenedor principal que evita que el teclado tape los inputs
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportamiento del teclado
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0} // Desplazamiento del teclado en iOS
    >
      <View style={[styles.card, { backgroundColor: colors.card }]}>

        {/* Imagen del logo en la parte superior */}
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }} // URL del ícono
          style={styles.logo} // Estilo del logo
        />

        {/* Título principal */}
        <Text style={[styles.titulo, { color: colors.text }]}>🔑 Recuperar Contraseña</Text> 

        {/* Subtítulo con instrucciones */}
        <Text style={[styles.subtitulo, { color: colors.subtext }]}>
          Ingresa tu correo electrónico para recibir un código de recuperación
        </Text>

        {/* Campo de texto para ingresar el correo */}
        <TextInput
          style={[
            styles.input, // Aplica estilos base
            { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text }, // Colores dinámicos
          ]}
          placeholder="📧 Correo electrónico" // Texto que aparece por defecto
          placeholderTextColor={colors.subtext} // Color del placeholder
          value={email} // Valor del input
          onChangeText={setEmail} // Actualiza el estado al escribir
          keyboardType="email-address" // Teclado tipo correo electrónico
          autoCapitalize="none" // Evita mayúsculas automáticas
          editable={!loading} // Desactiva el campo si está cargando
        />

        {/* Botón para enviar el correo de recuperación */}
        <BottonComponent
          title="📤 Enviar" // Texto del botón
          onPress={handleResetPassword} // Acción al presionar
          disabled={loading} // Desactiva el botón mientras carga
          gradient // Aplica estilo con degradado
        />

        {/* Botón para volver a la pantalla de login */}
        <BottonComponent
          title="⬅️ Volver al Login" // Texto del botón
          onPress={() => navigation.goBack()} // Regresa a la pantalla anterior
          style={{
            backgroundColor: "#0A2647", // Color de fondo azul oscuro
            paddingVertical: 14, // Espaciado vertical
            paddingHorizontal: 20, // Espaciado horizontal
            borderRadius: 25, // Bordes redondeados
          }}
        />

      </View>
    </KeyboardAvoidingView>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el alto disponible
    justifyContent: "center", // Centra verticalmente
    alignItems: "center", // Centra horizontalmente
    padding: 20, // Márgenes internos
  },
  card: {
    width: "100%", // Ocupa todo el ancho disponible
    maxWidth: 380, // Ancho máximo
    borderRadius: 20, // Bordes redondeados
    padding: 25, // Relleno interno
    alignItems: "center", // Centra el contenido
    shadowColor: "#000", // Color de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowOffset: { width: 0, height: 6 }, // Posición de la sombra
    shadowRadius: 10, // Difuminado de la sombra
    elevation: 6, // Sombra visible en Android
  },
  logo: {
    width: 90, // Ancho del logo
    height: 90, // Alto del logo
    marginBottom: 15, // Espacio debajo del logo
  },
  titulo: {
    fontSize: 26, // Tamaño del texto
    fontWeight: "bold", // Negrita
    marginBottom: 5, // Espaciado inferior
    textAlign: "center", // Centrado del texto
  },
  subtitulo: {
    fontSize: 14, // Tamaño del texto del subtítulo
    marginBottom: 25, // Espaciado inferior
    textAlign: "center", // Centrado
  },
  input: {
    width: "100%", // Ocupa todo el ancho
    padding: 14, // Espaciado interno
    borderWidth: 1, // Grosor del borde
    borderRadius: 12, // Bordes redondeados
    marginBottom: 15, // Espaciado inferior
    fontSize: 15, // Tamaño de letra
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
// import { requestPasswordReset } from "../../Src/Services/AuthService";

// export default function RecuperarContrasena({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

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

//   const handleResetPassword = async () => {
//     if (!email) {
//       Alert.alert("Error", "Por favor ingresa tu correo electrónico");
//       return;
//     }
//     setLoading(true);
//     try {
//       const result = await requestPasswordReset(email);
//       if (result.success) {
//         Alert.alert("Éxito", "Se ha enviado un código de recuperación a tu correo electrónico");
//         navigation.navigate("VerificarCodigo", { email });
//       } else {
//         Alert.alert(
//           "Error",
//           typeof result.message === "string"
//             ? result.message
//             : result.message?.message || JSON.stringify(result.message) || "Ocurrió un error al enviar la solicitud"
//         );
//       }
//     } catch (error) {
//       console.error("Error inesperado en recuperación:", error);
//       Alert.alert("Error", "Ocurrió un error inesperado al intentar recuperar la contraseña");
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
//         <Text style={[styles.titulo, { color: colors.text }]}>🔑 Recuperar Contraseña</Text>
//         <Text style={[styles.subtitulo, { color: colors.subtext }]}>
//           Ingresa tu correo electrónico para recibir un  Codigo de  recuperación
//         </Text>

//         {/* Input */}
//         <TextInput
//           style={[
//             styles.input,
//             { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text },
//           ]}
//           placeholder="📧 Correo electrónico"
//           placeholderTextColor={colors.subtext}
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           editable={!loading}
//         />

//         <BottonComponent
//           title="📤 Enviar "
//           onPress={handleResetPassword}
//           disabled={loading}
//           gradient
//         />

//         <BottonComponent
//           title="⬅️ Volver al Login"
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
//   },
// });
