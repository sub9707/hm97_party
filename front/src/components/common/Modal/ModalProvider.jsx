import React from 'react';
import useModalStore from '/src/store/useModalStore';

const ModalProvider = () => {
  const { modals, closeModal } = useModalStore();

  return (
    <>
      {Object.entries(modals).map(([id, Component]) => (
        <div key={id} className="modal-overlay">
          <div className="modal-content">
            <Component onClose={() => closeModal(id)} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ModalProvider;