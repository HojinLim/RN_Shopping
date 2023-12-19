import { User, updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

/**
 * Firebase에 사진 업로드 위해선 Blob형식의 파일이 필요함
 * Uri -> Blob형태로 변경해주는 함수
 * @param uri
 * @returns
 */
export const convertUrIToBlob = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error(`Error fetching or converting blob for URI ${uri}`, error);
    // You might want to handle the error in a way that makes sense for your application
    throw error;
  }
};

export const uploadProfileImage = async (image: Blob, uid: string) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `user/profileImg/${uid}/profileImg`);

    // Data URL string

    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  } catch (error) {
    console.log(error);
  }
};
export const uploadStringProfileImage = async (image: Blob, uid?: string) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `user/profileImg/${uid}/profileImg`);

    // Explicitly set the content type
    const metadata = { contentType: "image/jpeg" };

    uploadBytes(storageRef, image, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  } catch (error) {
    console.log(error);
  }
};

export const downloadProfileImage = async (uid: string) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `user/profileImg/${uid}/profileImg`);

    const downloadURL = await getDownloadURL(storageRef);

    // Use the downloadURL as needed (e.g., set it as the source of an image tag)
    console.log("Downloaded URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error downloading profile image:", error);
    throw error;
  }
};

export const downloadBasicProfileImage = async () => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `user/basic`);
    console.log(storageRef);

    const downloadURL = await getDownloadURL(storageRef);

    // Use the downloadURL as needed (e.g., set it as the source of an image tag)
    console.log("Downloaded URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error downloading profile image:", error);
    throw error;
  }
};

export const uploadBasicProfileImage = async (image: Blob) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `user/basic`);

    // Data URL string

    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPhoto = async (user: User, uri: string) => {
  updateProfile(user, {
    photoURL: uri,
  })
    .then(() => {
      // Profile update successful
      console.log("Profile updated successfully!");
    })
    .catch((error) => {
      // Handle errors
      console.error("Error updating profile:", error.message);
    });
};
