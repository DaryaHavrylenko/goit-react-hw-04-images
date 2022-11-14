import React, { Component } from 'react';
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
export class Modal extends Component {
  closeByEscape = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.props.closeModal();
  };
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEscape);
  }
  render() {
    return createPortal(
      <ModalOverlay onClick={this.props.closeModal}>
        <ModalImg>
          <img src={this.props.modalImg} alt={this.props.alt} />
        </ModalImg>
      </ModalOverlay>,
      modalRoot
    );
  }
}
