import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserFirebase } from '../hooks/useUserFirebase';

import { UserContext } from '../context/userContext';

import { Box, Text, useToast } from '@chakra-ui/react';

import EditImage from '../components/EditImage';
import FormEditProfile from '../components/editProfile/FormEditProfile';

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [srcImg, setSrcImg] = useState(user.photoURL);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const { updateUserImg, updateUserInfo } = useUserFirebase();
  const toast = useToast();

  let infoObject = {
    displayName: user.displayName,
  };

  const onEdit = async (values) => {
    setLoadingImg(true);
    try {
      const file = values.image[0];
      console.log(file);
      const src = await updateUserImg(file);
      setSrcImg(src);
      toast({
        title: 'Updated photo',
        description: '🥳 Photo updated successfully 🥳',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'ERROR',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoadingImg(false);
    }
  };

  const handleSubmitInfo = async (values) => {
    setLoadingInfo(true);
    try {
      console.log(values);
      const newName = await updateUserInfo(values.displayName);
      setNewDisplayName(newName);
      infoObject = {
        displayName: newName,
      };
      toast({
        title: 'Updated information',
        description: '🥳 Information updated successfully 🥳',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'ERROR',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoadingInfo(false);
    }
  };
  return (
    <>
      <Box>
        <Text>Editar perfil</Text>
        <Box>
          <EditImage
            src={srcImg}
            alt={newDisplayName || user.email}
            isAvatar
            loading={loadingImg}
            onEdit={onEdit}
          />
        </Box>
        <FormEditProfile
          onEdit={handleSubmitInfo}
          item={infoObject}
          loading={loadingInfo}
        />
      </Box>
    </>
  );
};

export default ProfilePage;
