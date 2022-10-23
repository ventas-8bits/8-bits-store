import { auth, storage } from '../firabese.config';
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const useUserFirebase = () => {
  const saveAndGetImageURL = async (file) => {
    try {
      const metadata = {
        contentType: file.type,
        name: auth.currentUser.uid,
        size: file.size,
        customMetadata: {
          uidUser: auth.currentUser.uid,
        },
      };
      const storageRef = ref(storage, `profile/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
      await updateMetadata(storageRef, metadata);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log(error);
      throw { message: error.message };
    }
  };

  const updateUserImg = async (file) => {
    const photoURL = await saveAndGetImageURL(file);

    await updateProfile(auth.currentUser, {
      photoURL,
    });
    return photoURL;
  };

  const updateUserInfo = async (displayName) => {
    await updateProfile(auth.currentUser, {
      displayName,
    });

    return displayName;
  };

  return { updateUserImg, updateUserInfo };
};

export { useUserFirebase };
