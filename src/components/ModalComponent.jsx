import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';

const ModalComponent = ({
  isOpen,
  onClose,
  title,
  buttons = true,
  actionButtonLabel = 'Accept',
  actionButton,
  actionButtonColor = 'ghost',
  children,
}) => {
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            {buttons && (
              <>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme={actionButtonColor} onClick={actionButton}>
                  {actionButtonLabel}
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
