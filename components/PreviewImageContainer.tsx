import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import TextButton from "./common/TextButton";

type Props = {
  imageUrls: string[];
  deleteImageHandler: (idx: number) => void;
};

const PreviewImageContainer = (props: Props) => {
  return (
    <View style={styles.imageOuterContainer}>
      <ScrollView horizontal>
        {props.imageUrls &&
          props.imageUrls.map((imageUrl, idx) => (
            <View style={styles.imageContainer} key={idx}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <TextButton
                title="삭제하기"
                onPress={() => props.deleteImageHandler(idx)}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default PreviewImageContainer;

const styles = StyleSheet.create({
  imageOuterContainer: {
    flexDirection: "row", // Horizontal arrangement, you can use 'column' for vertical
    justifyContent: "space-between", // Space evenly between the images
    padding: 10, // Adjust as needed
    paddingVertical: 15,
  },
  imageContainer: {
    marginHorizontal: 5,
  },
  image: {
    width: 100, // Adjust the width of each image
    height: 100, // Adjust the height of each image
    resizeMode: "cover", // Adjust the resizeMode property as needed
    borderRadius: 8, // Add border radius for rounded corners
    margin: 10, // Adjust horizontal margin between images
  },
  button: {
    width: "auto",
  },
});
