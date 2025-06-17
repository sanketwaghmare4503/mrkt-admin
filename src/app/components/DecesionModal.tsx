import React from 'react';
import { Modal, Button } from '@atomos_tech/genesis';
import SubmitButton from './SubmitButton';

interface DecisionModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: React.ReactNode; 
  title?: string;
  handleProcess?: () => Promise<void>
  cancelText?: string;
  isLoading?: boolean;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({
  showModal,
  setShowModal,
  message,
  title = 'Confirmation',
  handleProcess,
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  

  const handleCancel = () => {
    if (!isLoading) {
      setShowModal(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      closeModal={false}
      closeOnOutsideClick={!isLoading}
      className="transition-all duration-200 ease-in-out"
    >
      <div className="p-4">
        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {title}
          </h2>
        )}
        
        <div className="text-gray-600 mb-2">
          {typeof message === 'string' ? (
            <p className="whitespace-pre-line">{message}</p>
          ) : (
            message
          )}
        </div>
        
        <div className="flex justify-end space-x-3 ">
          <Button
          
            onClick={handleCancel}
            variant={"outlined"}
            disabled={isLoading}
            className="min-w-[80px]"
          >
            {cancelText}
          </Button>
          <SubmitButton

                      onClick={handleProcess}
                      loading={isLoading}
                      disabled={isLoading}
                      className="min-w-[80px]" name={'Yes'}            />
        </div>
      </div>
    </Modal>
  );
};