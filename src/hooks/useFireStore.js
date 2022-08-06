import { useState } from 'react';
import { db, storage, auth } from '../firabese.config.js';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';
import { deleteObject, getDownloadURL, ref, updateMetadata, uploadBytes } from 'firebase/storage';

const useFireStore = () => {
  const [data, setData] = useState([]);
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
    const nano = nanoid(8);
    const { name, reference, price, categories, description, image, topics } = productData;
    try {
      console.log('creando');
      setLoading((prev) => ({ ...prev, createProduct: true }));
      const imageURL = await saveAndGetImageURL(image[0], nano);
      const newProd = {
        name,
        reference: `${reference}${nano}`,
        price,
        categories,
        description,
        url_image: imageURL,
        topics,
        date: Date.now(),
        id: nano,
      };
      const docRef = doc(db, 'products', newProd.id);
      await setDoc(docRef, newProd);
      setData([newProd, ...data]);
      console.log('agregado');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, createProduct: false }));
    }
  };

  const getProducts = async () => {
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const docRef = collection(db, 'products');

      const first = query(docRef, orderBy('date', 'desc'), limit(limitPage));
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
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  const ChangePage = async () => {
    try {
      setLoading((prev) => ({ ...prev, getChange: true }));
      const docRef = collection(db, 'products');
      const next = query(docRef, orderBy('date', 'desc'), startAfter(lastDoc), limit(limitPage));

      const snapShot = await getDocs(next);
      const lastVisible = snapShot.docs[snapShot.docs.length - 1];

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
      const first = query(docRef, orderBy('date', 'desc'), startAfter(lastDoc), limit(limitPage));
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
      const first = query(docRef, orderBy('date', 'desc'), endBefore(firstDoc), limit(limitPage));
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

  const deleteImage = async (id) => {
    try {
      const imgRef = ref(storage, `products/${id}`);
      await deleteObject(imgRef);
      return true;
    } catch (error) {
      console.log(error);
      throw { message: 'Image not found' };
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, delete: true }));
      const prodDel = collection(db, 'products');
      const q = query(prodDel, where('id', '==', id));
      // const q = query(prodDel, where('id', '==', id));
      const snapShot = await getDocs(q);
      if (snapShot.empty) {
        throw { message: 'Document not exist' };
      }
      const imgDel = await deleteImage(id);
      if (imgDel) {
        const prodRef = doc(db, 'products', id);
        await deleteDoc(prodRef);
        setData(data.filter((item) => item.id !== id));
        console.log('Borrado');
      }
      // snapShot.docs.forEach((el) => console.log(el.data()));
      // console.log('delete: ', id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return {
    data,
    loading,
    createNewProduct,
    getProducts,
    ChangePage,
    nextPage,
    prevPage,
    isTheLast,
    isThefirst,
    deleteProduct,
  };
};

export { useFireStore };
