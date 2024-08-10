import React, { useState, useEffect, useRef } from "react";
import { Button, Text, View, Box, Center, HStack, Image } from "native-base";
import { Camera, CameraType } from "expo-camera";

export const takePic = ({ navigation }) => {
  //navigation handlers
  const handleBackToRecruiter = () => {
    navigation.navigate("Home");
  };

  //setting up camera and photo state

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [pictureTaken, setPictureTaken] = useState(false);

  //requesting camera permissions
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);
  //taking picture
  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    let capturedPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(capturedPhoto);
    setPictureTaken(true);
  };
  // for retake button
  let retakePic = () => {
    setPhoto(null);
    setPictureTaken(false);
  };

  // upload the image to fastapi
  const uploadImage = async (uri) => {
    // create a form data object
    console.log(uri);
    let formData = new FormData();
    formData.append("image", {
      uri,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      //send a POST request to the server
      const response = await fetch(
        "https://ea89-5-148-98-110.ngrok-free.app/process_image",
        {
          method: "POST",
          body: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const result = data.result;
        const filename = data.filename;

        return { result, filename };
      } else {
        console.log("image failed to upload:");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View flex={1} bg={"#F5F5DC"}>
      <Box flex={0.3} safeArea justifyContent={"space-between"}>
        <View />
        <View />
        <Text ml={3} fontSize="3xl" bold>
          Connect via Business Card
        </Text>
      </Box>
      <Box flex={3}>
        {hasCameraPermission && !pictureTaken ? (
          <Box
            borderWidth="4"
            borderRadius="md"
            borderColor={"#5E8C61"}
            m={3}
            flex={1}
          >
            <Camera
              style={{
                flex: 1,
              }}
              type={type}
              ref={cameraRef}
            />
          </Box>
        ) : photo ? (
          <Box flex={1}>
            <Image
              source={{ uri: photo.uri }}
              alt="Captured Photo"
              borderWidth="4"
              borderRadius="md"
              borderColor={"#5E8C61"}
              m={3}
              resizeMode="contain"
              flex={1}
            />
          </Box>
        ) : (
          <Center flex={1}>
            <Text color={"error.600"}>
              {hasCameraPermission === undefined
                ? "Requesting permission..."
                : "No access to camera. Please change in settings."}
            </Text>
          </Center>
        )}
      </Box>
      <Box flex={1}>
        <Box m={3}>
          {photo ? (
            <HStack space={1} w={"100%"}>
              <Button
                w={"50%"}
                bg={"#5E8C61"}
                onPress={() => {
                  handleSummaryReport(photo.uri);
                }}
                mb={1}
              >
                Use
              </Button>
              <Button w={"50%"} bg={"#5E8C61"} onPress={retakePic} mb={1}>
                Retake
              </Button>
            </HStack>
          ) : (
            <Button
              bg={"#5E8C61"}
              onPress={takePic}
              mb={1}
              disabled={!hasCameraPermission}
            >
              Take Picture
            </Button>
          )}
          <Button bg={"#5E8C61"} onPress={handleBackToRecruiter}>
            Cancel
          </Button>
        </Box>
      </Box>
    </View>
  );
};
