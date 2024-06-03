import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeStack from "./screens/navigation/HomeStack";
import LoginStack from "./screens/navigation/LoginStack";
import { BookingProvider } from "./context/BookingContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AppLoading from "expo-app-loading";
import "react-native-url-polyfill/auto";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#e0f7fa",
    background: "white",
  },
};

const Main = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer theme={MyTheme}>
      {user ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <BookingProvider>
        <Main />
      </BookingProvider>
    </AuthProvider>
  );
}
