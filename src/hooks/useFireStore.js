import { useState } from 'react';
import { db, storage, auth } from '../firabese.config.js';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  endBefore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';
import {
  deleteObject,
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from 'firebase/storage';

const useFireStore = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [product, setProduct] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({});
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [isTheLast, setIsTheLast] = useState(false);
  const [isThefirst, setIsTheFirst] = useState(false);

  const limitPage = 10;

  const saveAndGetImageURL = async (file, nano) => {
    try {
      const metadata = {
        contentType: file.type,
        name: nano,
        size: file.size,
        customMetadata: {
          uidUser: auth.currentUser.uid,
        },
      };
      const storageRef = ref(storage, `products/${nano}`);
      await uploadBytes(storageRef, file);
      await updateMetadata(storageRef, metadata);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log(error);
      throw { message: error.message };
    }
  };

  const createNewProduct = async (productData = {}) => {
    console.log(productData);
    const nano = nanoid(8);
    const {
      name,
      reference,
      price,
      categories,
      description,
      image,
      topics,
      isNew,
      isOnSale,
      priceOnSale,
    } = productData;
    try {
      console.log('creando');
      setLoading((prev) => ({ ...prev, createProduct: true }));
      const imageURL = await saveAndGetImageURL(image[0], nano);
      const newProd = {
        product_name: name.toLowerCase(),
        product_reference: `${reference}${nano}`,
        product_price: price,
        product_categories: categories,
        product_description: description,
        product_url_image: imageURL,
        product_topics: topics,
        product_date: Date.now(),
        product_id: nano,
        product_isNew: isNew,
        product_isOnSale: isOnSale,
        product_priceOnSale: priceOnSale || 0,
      };
      const docRef = doc(db, 'products', newProd.product_id);
      await setDoc(docRef, newProd);
      setData([newProd, ...data]);
      console.log('agregado');
    } catch (error) {
      throw { message: error };
    } finally {
      setLoading((prev) => ({ ...prev, createProduct: false }));
    }
  };

  const getProducts = async () => {
    if (data.length < 0) {
      return;
    }
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const docRef = collection(db, 'products');

      const first = query(
        docRef,
        orderBy('product_date', 'desc'),
        limit(limitPage)
      );
      const snapShot = await getDocs(first);

      const lastVisible = snapShot.docs[snapShot.docs.length - 1] || null;
      const firstVisible = snapShot.docs[0] || null;
      setIsTheFirst(true);
      const dataDB = snapShot.docs.map((doc) => doc.data());
      setFirstDoc(firstVisible);
      setData(dataDB);
      setLastDoc(lastVisible);
      setIsTheLast(false);
    } catch (error) {
      throw { message: error };
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  const deleteImage = async (id) => {
    try {
      const imgRef = ref(storage, `products/${id}`);
      await deleteObject(imgRef);
      return true;
    } catch (error) {
      throw { message: 'Image not found' };
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, delete: true }));
      const prodDel = collection(db, 'products');
      const q = query(prodDel, where('product_id', '==', id));
      // const q = query(prodDel, where('id', '==', id));
      const snapShot = await getDocs(q);
      if (snapShot.empty) {
        throw { message: 'Document not exist' };
      }
      const imgDel = await deleteImage(id);
      if (imgDel) {
        const prodRef = doc(db, 'products', id);
        await deleteDoc(prodRef);
        setData(data.filter((item) => item.product_id !== id));
        setSearchData(data.filter((item) => item.product_id !== id));
        console.log('Borrado');
      }
      // snapShot.docs.forEach((el) => console.log(el.data()));
      // console.log('delete: ', id);
    } catch (error) {
      throw { message: error };
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const getOneProduct = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, getOne: true }));
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw { message: 'Product not found' };
      }

      setProduct(docSnap.data());
    } catch (error) {
      throw { message: error };
    } finally {
      setLoading((prev) => ({ ...prev, getOne: false }));
    }
  };

  const editImage = async (file, id) => {
    try {
      setLoading((prev) => ({ ...prev, editImage: true }));
      if (typeof id !== 'string') {
        throw { message: 'Id not valid' };
      }
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw { message: 'Product not found' };
      }

      const imageURL = await saveAndGetImageURL(file[0], id);
      await updateDoc(docRef, {
        prodcut_url_image: imageURL,
      });
      console.log('Actualizado: ', imageURL);

      setProduct({ ...product, product_url_image: imageURL });
    } catch (error) {
      throw { message: error.message };
    } finally {
      setLoading((prev) => ({ ...prev, editImage: false }));
    }
  };

  const editInformation = async (id, info) => {
    try {
      setLoading((prev) => ({ ...prev, editInfo: true }));
      if (typeof id !== 'string') {
        throw { message: 'Id not valid' };
      }
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw { message: 'Product not found' };
      }

      const dataToEdit = {
        product_name: info.name.toLowerCase(),
        product_reference: `${info.reference}${id}`,
        product_price: info.price,
        product_categories: info.categories,
        product_description: info.description,
        product_topics: info.topics,
        product_priceOnSale: info.priceOnSale,
        product_isNew: info.isNew,
        product_isOnSale: info.isOnSale,
      };

      await updateDoc(docRef, dataToEdit);
      setProduct({ ...product, ...dataToEdit });

      console.log('Actualizado');
    } catch (error) {
      throw { message: error.message };
    } finally {
      setLoading((prev) => ({ ...prev, editInfo: false }));
    }
  };

  const searchProducts = async (search) => {
    try {
      console.log(search);
      setLoading((prev) => ({ ...prev, search: true }));
      const docRef = collection(db, 'products');
      const q_name = query(
        docRef,
        where('product_name', '==', search.toLowerCase())
      );
      const q_cat = query(
        docRef,
        where('product_categories', 'array-contains', search.toLowerCase())
      );
      const q_topic = query(
        docRef,
        where('product_topics', 'array-contains', search.toLowerCase())
      );
      const snapName = await getDocs(q_name);
      const snapTopics = await getDocs(q_topic);
      const snapCat = await getDocs(q_cat);

      const dataName = snapName.docs.map((item) => item.data());
      const dataTopics = snapTopics.docs.map((item) => item.data());
      const dataCat = snapCat.docs.map((item) => item.data());

      setSearchData([...dataName, ...dataTopics, ...dataCat]);
    } catch (error) {
      throw { message: error.message };
    } finally {
      setLoading((prev) => ({ ...prev, search: false }));
    }
  };

  const ChangePage = async () => {
    try {
      setLoading((prev) => ({ ...prev, getChange: true }));
      const docRef = collection(db, 'products');
      const next = query(
        docRef,
        orderBy('product_date', 'desc'),
        startAfter(lastDoc),
        limit(limitPage)
      );

      const snapShot = await getDocs(next);
      const lastVisible = snapShot.docs[snapShot.docs.length - 1] || null;
      if (!lastVisible) {
        return;
      }
      const dataDB = snapShot.docs.map((doc) => doc.data());
      setData([...data, ...dataDB]);
      setLastDoc(lastVisible);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, getChange: false }));
    }
  };

  const nextPage = async () => {
    try {
      setIsTheFirst(false);
      const docRef = collection(db, 'products');
      const first = query(
        docRef,
        orderBy('product_date', 'desc'),
        startAfter(lastDoc),
        limit(limitPage)
      );
      const snapShot = await getDocs(first);
      // cuando llega al ultimo elemento y ejecutas la funcion nuevamnete, traerá un objeto vacio
      // cuando sea null se reinicia, haciendo que volvamos a la primera pag
      const lastVisible = snapShot.docs[snapShot.docs.length - 1] || null;
      const firstVisible = snapShot.docs[0] || null;
      console.log(lastVisible);

      const dataDB = snapShot.docs.map((doc) => doc.data());
      setLastDoc(lastVisible);
      setFirstDoc(firstVisible);
      setData(dataDB);

      // snapShot.docs.forEach((doc) => console.log(doc.data()));
    } catch (error) {
      console.log(error);
    }
  };

  const prevPage = async () => {
    try {
      setIsTheLast(false);
      const docRef = collection(db, 'products');
      //aqui usamos endBefore para que nos traiga los x elemenos antes del firstDoc
      const first = query(
        docRef,
        orderBy('product_date', 'desc'),
        endBefore(firstDoc),
        limit(limitPage)
      );
      const snapShot = await getDocs(first);
      // cuando llega al ultimo elemento y ejecutas la funcion nuevamnete, traerá un objeto vacio
      // cuando sea null se reinicia, haciendo que volvamos a la primera pag
      const lastVisible = snapShot.docs[snapShot.docs.length - 1] || null;
      const firstVisible = snapShot.docs[0] || null;

      lastVisible === null ? setIsTheLast(true) : setIsTheLast(false);
      firstVisible === null ? setIsTheFirst(true) : setIsTheFirst(false);
      firstVisible === lastVisible && setIsTheLast(false);

      setLastDoc(lastVisible);
      setFirstDoc(firstVisible);
      const dataDB = snapShot.docs.map((doc) => doc.data());
      firstVisible && setData(dataDB);
      // snapShot.docs.forEach((doc) => console.log(doc.data()));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data,
    loading,
    product,
    searchData,
    createNewProduct,
    getProducts,
    ChangePage,
    nextPage,
    prevPage,
    isTheLast,
    isThefirst,
    deleteProduct,
    getOneProduct,
    editImage,
    editInformation,
    searchProducts,
  };
};

export { useFireStore };
