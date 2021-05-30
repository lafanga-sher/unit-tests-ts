import React, { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

export interface ModalProps {
  show: boolean;
  onHide: () => void;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ children, show }) => {
  const [modalContainerElement, setModalContainerElement] =
    useState<HTMLElement | null>(null);

  // create the modal container
  useEffect(() => {
    let modalContainer =
      document.querySelector<HTMLElement>('#modal-container');
    if (modalContainer) {
      setModalContainerElement(modalContainer);
    } else {
      const body = document.querySelector<HTMLBodyElement>('body');
      modalContainer = document.createElement('div');
      modalContainer.id = 'modal-container';
      body?.appendChild(modalContainer);
      setModalContainerElement(modalContainer);
    }
  }, []);

  return modalContainerElement ? (
    ReactDOM.createPortal(
      show && <div className="modal">{children}</div>,
      modalContainerElement!
    )
  ) : (
    <></>
  );
};

export default Modal;
