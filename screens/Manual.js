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
import * as Linking from "expo-linking";

export const Manual = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
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

  const handleCreateDraft = async () => {
    const subject = "Ernesto Rivera from Recruiting Event";
    const bodyContent = `Dear ${name},\nPosition: ${position}\n\n${notes.join(
      "\n"
    )}\n\nBest regards,\nYour Name`;
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(
      bodyContent
    )}`;

    // Ensure mailtoUrl is ready before opening
    await Promise.resolve(mailtoUrl).then(() => {
      Linking.openURL(mailtoUrl);
    });
  };

  return (
    // center text and button
    <View flex={1} bg={"#F5F5DC"}>
      <View
        flex={1}
        justifyContent={"flex-end"}
        alignItems={"flex-start"}
        pl={4}
      >
        <Heading size={"2xl"}>Manual Entry</Heading>
      </View>
      <View flex={2} padding={4}>
        <View flex={1} justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Text bold>Enter your recepient's name:</Text>
          <Input value={name} onChangeText={setName} placeholder="Name" />
          <Text bold>Enter your recepient's email:</Text>
          <Input value={email} onChangeText={setEmail} placeholder="Email" />
          <Text bold>Enter your recepient's Position:</Text>
          <Input
            value={position}
            onChangeText={setPosition}
            placeholder="Position"
          />
        </View>
        <View flex={1.5} borderTopWidth={2} borderBottomColor={"black"}>
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
      <View flex={1} justifyContent={"flex-start"} alignItems={"center"}>
        <Stack w="100%">
          <Center w="100%" pb={2}>
            <Button onPress={handleCreateDraft} w="50%">
              Submit
            </Button>
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
//<Text>Enter Individual's Email</Text>
