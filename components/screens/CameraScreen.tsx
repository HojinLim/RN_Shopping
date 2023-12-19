import {
  Button,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import IconButton from "../IconButton";
import TextIconButton from "../common/TextIconButton";
import { useNavigation } from "@react-navigation/native";
import { CommonScreenProp } from "../../src/static/const/type";

type Props = {};

const Duplicate = (props: Props) => {
  const navi = useNavigation<CommonScreenProp>();

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  // let camera: Camera | null;
  const [previewVisible, setPreviewVisible] = useState(false);
  // const [capturedImage, setCapturedImage] = useState<any>(null);
  const [flash, setFlash] = useState<FlashMode>(FlashMode.off);

  //
  const [imageUri, setImageUri] = useState<string | null>(null);
  const camera = useRef<Camera | null>(null);

  if (!permission) {
    return <Text>권한 미보유</Text>;
  }

  // 아직 카메라  권한을 받지 않았으면 권한 받기
  if (!permission.granted) {
    requestPermission();
  }

  const takePicture = async () => {
    if (!camera) return;

    try {
      if (!camera.current) return;
      const data = await camera.current.takePictureAsync();
      console.log(data);
      setImageUri(data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const savePicture = async () => {
    if (imageUri) {
      try {
        await MediaLibrary.createAssetAsync(imageUri);
        alert("사진 저장 완료! 🎉");
        setImageUri(null);
        console.log("saved successfully");
        navi.navigate("Admin", { uri: imageUri });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 카메라 촬영 전 화면 */}
      {!imageUri ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={camera}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            {/* 카메라 토글 아이콘 버튼 */}
            <IconButton
              iconName={"camera-reverse-outline"}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
              color="#fff"
            />
            <Text style={{ color: "white" }}>{type}</Text>
            {/* 카메라 플래쉬 아이콘 버튼 */}

            <IconButton
              iconName={"md-flash-outline"}
              onPress={() =>
                setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off)
              }
              color={flash === FlashMode.off ? "gray" : "#fff"}
            />
          </View>
        </Camera>
      ) : (
        <ImageBackground source={{ uri: imageUri }} style={styles.camera} />
      )}

      {/* 카메라 촬영 후 화면 */}
      <View style={styles.controls}>
        {imageUri ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <TextIconButton
              text="다시 찍기"
              onPress={() => setImageUri(null)}
              iconName="arrow-undo-outline"
            />
            <TextIconButton
              text="저장"
              iconName={"save-outline"}
              onPress={savePicture}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between", // Distribute items along the row
              alignItems: "center",
              paddingHorizontal: 16, // Add padding if necessary
            }}
          >
            <IconButton
              iconName={"arrow-back-outline"}
              onPress={() => navi.goBack()}
              color={"#fff"}
            />
            <TouchableOpacity
              style={styles.shotBtn}
              onPress={takePicture}
            ></TouchableOpacity>
            <Text style={{ color: "white" }}>"</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Duplicate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 8,
    // 상태바 높이만큼 마진값
    paddingTop: StatusBar.currentHeight,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    flex: 1,
    alignContent: "space-between",
    alignItems: "center",
  },

  controls: {},
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  shotBtn: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  iconContainer: {
    flexDirection: "row",
    width: 130,
    height: 40,
    alignItems: "center",
    borderRadius: 4,
  },
});
