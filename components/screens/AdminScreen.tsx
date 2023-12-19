import {
  ActivityIndicator,
  Button,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { inputNumberFormat } from "../../src/utils/functions/number";
import { addData, uploadImage } from "../../src/utils/functions/productManage";
import PreviewImageContainer from "../PreviewImageContainer";
import IconButton from "../IconButton";
import { globalStyles } from "../../src/css/css";
import {
  CommonScreenProp,
  RootStackParamList,
} from "../../src/static/const/type";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Icon from "../common/Icon";
import TextButton from "../common/TextButton";
import TextIconButton from "../common/TextIconButton";

type AdminScreenProps = StackScreenProps<RootStackParamList, "Admin">;
const AdminScreen = ({ route }: AdminScreenProps) => {
  // 사진 찍은거 받아옴
  useEffect(() => {
    if (route.params && route.params?.uri) {
      const uri = route.params.uri;
      console.log("값 받아옴");
      console.log(uri);
      setImageUrl((prev) => [...prev, uri]);
    }
  }, [route.params?.uri]);

  const [selectedCategory, setSelectedCategory] = useState("default");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // 현재 이미지 주소
  const [imageUrls, setImageUrl] = useState<string[]>([]);
  // 권한 요청을 위한 hooks
  const [status, requestImagePermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [blobs, setBlobs] = useState<Blob[]>([]);

  const changeNameHandler = (value: string) => {
    setName(value);
  };
  const changePriceHandler = (value: string) => {
    const price = inputNumberFormat(value);
    setPrice(price);
  };

  const setImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestImagePermission();
      if (!permission.granted) {
        return;
      }
    }
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3],
    });
    if (result.canceled) {
      return null; // 이미지 업로드 취소한 경우
    }

    console.log(result);
    setImageUrl((prev) => [...prev, result.assets[0].uri]);
    console.log(result.assets[0]);
    // 이미지 업로드 기능 추가 예정
  };

  const convertUrlsToBlobs = async () => {
    // Using Promise.all to wait for all promises to resolve
    await Promise.all(
      imageUrls.map(async (url, key) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          setBlobs((prev) => [...prev, blob]);
        } catch (error) {
          console.error(
            `Error fetching or converting blob for URL ${url}`,
            error
          );
        }
      })
    );
  };

  const submitHandler = () => {
    // Firebase Firestore에 상품 정보, Storage에 이미지들 저장
    const promiseData = addData(name, price, selectedCategory);

    convertUrlsToBlobs();
    promiseData.then((productId) => {
      try {
        blobs.map((blob, key) => {
          // 이미지 업로드
          uploadImage(blob, key, productId);
        });
      } catch (error) {
        console.log(error);
      }
    });

    initData();
  };

  // 제품 양식 초기화
  const initData = () => {
    setName("");
    setPrice("");
    setImageUrl([]);
    setBlobs([]);
    setSelectedCategory("default");
  };

  const deleteImageHandler = (idx: number) => {
    const filteredImages = imageUrls.filter((_, imgIdx) => imgIdx !== idx);
    setImageUrl(filteredImages);
  };

  // 카메라 관리

  const navi = useNavigation<CommonScreenProp>();

  const cameraHandler = () => {
    // 권한이 있음

    navi.navigate("Camera");
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.pickerContainer}>
        {/* 카테고리 선택 */}
        <Picker
          style={styles.pickerContainer}
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => handleCategoryChange(itemValue)}
        >
          <Picker.Item label="Select a category" value="default" />
          <Picker.Item label="상의" value="상의" />
          <Picker.Item label="하의" value="하의" />
          <Picker.Item label="신발" value="신발" />
          <Picker.Item label="모자" value="모자" />
          <Picker.Item label="악세사리" value="악세사리" />
        </Picker>
      </View>
      {/* <View>
        <Text>선택된 카테고리: {selectedCategory}</Text>
      </View> */}
      {/* 상품명 영역 */}
      <View style={styles.inputContainer}>
        <View style={globalStyles.rowContainer}>
          <TextInput
            style={styles.input}
            placeholder="상품명을 입력해주세요"
            onChangeText={changeNameHandler}
            value={name}
            keyboardType="default"
          />
        </View>

        {/* 가격 영역 */}
        <View style={globalStyles.rowContainer}>
          <TextInput
            style={styles.input}
            placeholder="가격을 입력해주세요"
            onChangeText={changePriceHandler}
            value={price}
            keyboardType="default"
          />
        </View>
      </View>

      {/* 이미지 업로드 영역 */}

      <View style={{ ...globalStyles.rowContainer, marginStart: 10 }}>
        <TextIconButton
          onPress={setImage}
          iconName={"image-outline"}
          text="사진 올리기"
          fontColor="black"
          btnColor="black"
          size={40}
        />

        <TextIconButton
          onPress={cameraHandler}
          iconName={"camera-outline"}
          text="사진 촬영"
          fontColor="black"
          btnColor="black"
          size={40}
        />
      </View>

      <PreviewImageContainer
        imageUrls={imageUrls}
        deleteImageHandler={deleteImageHandler}
      />

      <TextButton
        onPress={submitHandler}
        title="제출하기"
        customStyle={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "blue",
        }}
      />
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },
  pickerContainer: {
    borderColor: "black",
    borderWidth: 2,
    padding: 5,
  },
  circle: {
    width: 2,
  },
  inputContainer: {
    marginVertical: 10,
    alignContent: "center",
    alignItems: "center",
  },
  input: {
    height: "auto",
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 15,
    flexDirection: "row",
    marginHorizontal: 10,
    paddingVertical: 15,
    fontSize: 15,
  },
  priceText: {
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  imageContainer: {
    flexDirection: "row", // Horizontal arrangement, you can use 'column' for vertical
    justifyContent: "space-between", // Space evenly between the images
    padding: 10, // Adjust as needed
  },
  image: {
    width: 100, // Adjust the width of each image
    height: 100, // Adjust the height of each image
    resizeMode: "cover", // Adjust the resizeMode property as needed
    borderRadius: 8, // Add border radius for rounded corners
    marginHorizontal: 5, // Adjust horizontal margin between images
  },
});
