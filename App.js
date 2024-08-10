import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./screens/Home";
import { DigitalEntry } from "./screens/DigitalEntry";
import { Manual } from "./screens/Manual";
import { takePic } from "./screens/takePic";
import { NativeBaseProvider } from "native-base";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              //gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Manual"
            component={Manual}
            options={{
              //gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DigitalEntry"
            component={DigitalEntry}
            options={{
              //gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="takePic"
            component={takePic}
            options={{
              //gestureEnabled: false,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
