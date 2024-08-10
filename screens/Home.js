import React from "react";
import { View, Text, Stack, Center, Button, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
// native base import

export const Home = () => {
  const navigation = useNavigation();

  const goToPicture = () => {
    navigation.navigate("takePic");
  };

  const goToManual = () => {
    navigation.navigate("Manual");
  };

  return (
    // center text and button
    <View flex={1} bg={"#F5F5DC"}>
      <View flex={1} justifyContent={"flex-end"} alignItems={"center"}>
        <Heading size={"2xl"}>Hi, Let's Connect!</Heading>
      </View>
      <View flex={1} justifyContent={"center"} alignItems={"center"}>
        <Stack space={2} w="100%">
          <Center w="100%">
            <Button w="50%" onPress={goToManual}>
              Manual
            </Button>
          </Center>
          <Center w="100%">
            <Button w="50%" onPress={goToPicture}>
              Digital Entry
            </Button>
          </Center>
        </Stack>
      </View>
      <View flex={1}></View>
    </View>
  );
};
