import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const ImageGallery = ({ items }) => {
  return (
    <List>
      {items.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            alt={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          ></ImageGalleryItem>
        );
      })}
    </List>
  );
};
ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
