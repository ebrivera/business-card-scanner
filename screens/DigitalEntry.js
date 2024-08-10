import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Heading,
  ScrollView,
  Box,
  Center,
  VStack,
  Stack,
  HStack,
  Input,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";

export const DigitalEntry = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation();

  const goHome = () => {
    navigation.navigate("Home");
  };

  const handleAddNote = () => {
    if (inputValue.trim()) {
      setNotes([...notes, inputValue]);
      setInputValue(""); // Clear input after adding
    }
  };

  const handleRemoveNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <View flex={1} bg={"red.100"}>
      <View
        flex={1}
        bg={"green.100"}
        justifyContent={"flex-end"}
        alignItems={"flex-start"}
        pl={4}
      >
        <Heading size={"2xl"}>Digital Entry</Heading>
      </View>
      <View flex={2} bg={"blue.100"} padding={4}>
        <View
          flex={1}
          bg={"blue.200"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          <Button>Take Picture</Button>
        </View>
        <View
          flex={2}
          bg="blue.300"
          borderTopWidth={2}
          borderBottomColor={"black"}
        >
          <Text bold pt={4}>
            Interaction notes:
          </Text>
          <Stack direction={"row"} w="100%" space={2} alignItems="stretch">
            <Input
              flex={1}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter a note"
            />
            <Button size="sm" onPress={handleAddNote}>
              +
            </Button>
          </Stack>
          <ScrollView>
            {notes.map((note, index) => (
              <View
                key={index}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack
                  direction={"row"}
                  w="100%"
                  space={2}
                  alignItems="stretch"
                >
                  <Text flex={1} bold>
                    {note}
                  </Text>
                  <Button
                    size="xs"
                    colorScheme="red"
                    onPress={() => handleRemoveNote(index)}
                  >
                    X
                  </Button>
                </Stack>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <View
        flex={1}
        bg={"green.300"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Stack w="100%">
          <Center w="100%" pb={2}>
            <Button w="50%">Submit</Button>
          </Center>
          <Center>
            <Button w="50%" onPress={goHome}>
              Cancel
            </Button>
          </Center>
        </Stack>
      </View>
    </View>
  );
};
