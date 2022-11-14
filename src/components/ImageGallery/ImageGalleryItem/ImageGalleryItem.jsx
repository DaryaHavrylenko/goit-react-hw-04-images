import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import styled from 'styled-components';

const Item = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;
const Image = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };
  render() {
    return (
      <Item>
        <Image
          src={this.props.webformatURL}
          alt=""
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal
            alt={this.props.alt}
            modalImg={this.props.largeImageURL}
            closeModal={this.toggleModal}
          />
        )}
      </Item>
    );
  }
}
