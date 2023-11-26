import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

type Props = {
  imageUrls: string[];
  deleteImageHandler: (idx: number) => void;
};

const PreviewImageContainer = (props: Props) => {
  return (
    <View style={styles.imageContainer}>
      <ScrollView horizontal>
        {props.imageUrls &&
          props.imageUrls.map((imageUrl, idx) => (
            <View>
              <Image
                key={idx}
                source={{ uri: imageUrl }}
                style={styles.image}
              />
              <Button
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
    marginHorizontal: 10, // Adjust horizontal margin between images
  },
  button: {
    width: "auto",
  },
});
