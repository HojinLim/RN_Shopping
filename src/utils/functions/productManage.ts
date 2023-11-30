import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { deleteObject, getDownloadURL, getStorage, list, ref, uploadBytes } from "firebase/storage";


// 'products'모든 데이터 가져오기
const getAllProductData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));

    return await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const imgs: string[] = [];

        const productRef = ref(storage, `products/${doc.id}`);
        const listResult = await list(productRef);
        await Promise.all(
          listResult.items.map(async (imageRef) => {
            const url = await getDownloadURL(imageRef);
            imgs.push(url);
          })
        );

        const product = {
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          category: doc.data().category,
          imgs
        };

        return product;
      })
    );
  } catch (error) {
    throw error;
  }
};


// 임의의 이름의 데이터를 문서로 저장
const addData = async (name: string, price: string, category: string) => {
  // 'products' 문서에 해당 값을 추가합니다.

  try {
    const docRef = await addDoc(collection(db, "products"), {
      name,
      price,
      category,
    });
    alert("상품 등록 완료!");
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Firebase Storage에 이미지 저장

const uploadImage = async (image: Blob, key: number, productId: string) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `products/${productId}/image_${key}`);

    // Data URL string

    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id: string) => {
  try {
    //storage에서 이미지 삭제
    const productRef = ref(storage, `products/${id}`);
    const listResult = await list(productRef);
    const deleteFilePromises = listResult.items.map((imgRef) => deleteObject(imgRef));

    //firestore에서 문서 삭제
    const deleteProduct = deleteDoc(doc(db, 'products', id));

    await Promise.all(deleteFilePromises.concat([deleteProduct]));
  } catch (error) {
    throw error;
  }
};


export { getAllProductData, addData, uploadImage, deleteProduct };
