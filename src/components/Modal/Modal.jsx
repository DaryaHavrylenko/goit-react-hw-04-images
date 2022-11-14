import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const ModalImg = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ closeModal, alt, modalImg }) {
  const closeByEscape = useCallback(
    e => {
      if (e.code !== 'Escape') {
        return;
      }
      closeModal();
    },
    [closeModal]
  );
  useEffect(() => {
    window.addEventListener('keydown', closeByEscape);
  }, [closeByEscape]);
  useEffect(() => {
    window.removeEventListener('keydown', closeByEscape);
  }, [closeByEscape]);

  // componentDidMount() {
  //   window.addEventListener('keydown', this.closeByEscape);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.closeByEscape);
  // }

  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ModalImg>
        <img src={modalImg} alt={alt} />
      </ModalImg>
    </ModalOverlay>,
    modalRoot
  );
}
